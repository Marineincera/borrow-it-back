import { UserService } from "./user.service";
import { UserRepository } from "../repositories/user.repository";
import { User } from "../entities/user.entity";
import { Token } from "../entities/token.entity";
import { TokenService } from "./token.service";

import { getCustomRepository } from "typeorm";
import { hash, verify } from "argon2";
import { randomBytes } from "crypto";
import { sign } from "jsonwebtoken";
import {
  createTestAccount,
  createTransport,
  getTestMessageUrl,
} from "nodemailer";

export class AuthService {
  private repository: UserRepository;
  private userService: UserService;
  private tokenService: TokenService;

  constructor() {
    this.repository = getCustomRepository(UserRepository);
    this.userService = new UserService();
    this.tokenService = new TokenService();
  }

  private async getUserSensitives(email: string) {
    if (
      await this.repository.findOne({
        where: { email },
        select: ["email", "password"],
      })
    ) {
      return true;
    }
  }

  // Crypte le password
  async signup(user: User) {
    if (await this.getUserSensitives(user.email)) {
      throw new Error("ALREADY_EXIST");
    }
    console.log(user);

    user.password = await hash(user.password); // from argon2

    const tokenString = randomBytes(12).toString("hex");

    user = this.repository.create(user); // Initialisation d'un objet user
    console.log("user INITIALIZED");
    user = await this.repository.save(user); // sauvegarder le user

    await this.nodemailer(tokenString, user); // envoi de mail

    const token = new Token();
    token.user = user;
    token.value = tokenString;
    token.expiration = new Date(new Date().getTime() + 1000 * 60 * 60 * 24);
    this.tokenService.create(token);

    return true;
  }

  async signIn(email: string, password: string) {
    const labelError = new Error("Invalide crendentials");
    // tslint:disable-next-line: max-line-length
    const user = await this.repository.findOne({
      where: { email },
      select: ["id", "email", "pseudo", "activated", "password"],
    }); // équivalent {where: {email:email}}
    // Si il n'y a pas eu d'activation de compte, renvoi l'erreur NOT ACTIVE
    // Si il y a actived true => continue la méthode signin
    if (!user?.activated) {
      throw new Error("NOT ACTIVE");
    }

    if (!user) {
      // Si pas user
      throw labelError;
    }
    const isValid = await verify(user.password, password);
    if (!isValid) {
      throw labelError;
    }

    const secret1 = process.env.BORROW_CHECKPOINT_SECRET;
    if (!secret1) {
      throw new Error("Pas de secret SETUP");
    }
    delete user.password;
    const token = sign(
      // from jsonwebtoken
      { id: user.id, pseudo: user.pseudo, email: user.email }, // id, username, role dans sign PAS DE PASSWORD !
      secret1
    ); // PrivateKey à entrer comme une variable environnement
    return { token, user };
  }

  async isConfirmed(token: string) {
    const userToken = await this.tokenService.getByValue(token);
    if (!userToken) {
      throw new Error("Lien invalide");
    }
    await this.userService.activUserAccount(userToken.user);
  }

  private async nodemailer(token: string, user: User) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    const testAccount = await createTestAccount();

    // create reusable transporter object using the default SMTP transport
    const transporter = createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address ou adresse mail du nom de domaine
      to: user.email, // list of receivers
      subject: "Activation link", // Subject line
      text: "Hello world?", // plain text body
      html: `<b> Hello ${user.pseudo} <a href="http://localhost:3000/auth/confirmation/${token}">
            Activation link </a>
            </b>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

  // Test verification user
  async verif(email: string, password: string) {
    const labelError = new Error("Invalide crendentials");
    const user = await this.repository.findOne({
      where: { email },
      select: ["id", "password", "email", "activated", "pseudo"],
    }); // équivalent {where: {email:email}}

    if (!user) {
      // Si pas user
      throw labelError;
    }
    const isValid = await verify(user.password, password);
    if (!isValid) {
      throw labelError;
    }

    const secret1 = process.env.BORROW_CHECKPOINT_SECRET;
    if (!secret1) {
      throw new Error("Pas de secret SETUP");
    }
    delete user.password;

    return user;
  }
}
