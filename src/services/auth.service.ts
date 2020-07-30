import { UserRepository } from "../repositories/user.repository";
import { UserService } from "./user.service";
import { getCustomRepository } from "typeorm";
import { User } from "../entities/user.entity";
import { hash, verify } from "argon2";
import { randomBytes, Verify } from "crypto";
import { TokenService } from "./token.service";
import { Token } from "../entities/token.entity";
import { sign } from "jsonwebtoken";
import jwt = require("jsonwebtoken");
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

  //crypte le passworde
  async signup(user: User) {
    if (await this.getUserSensitives(user.email)) {
      throw new Error("ALREADY_EXIST");
    }
    user.password = await hash(user.password); //argon2
    console.log(user.password);

    const tokenString = randomBytes(12).toString("hex");
    user = this.repository.create(user); // initialise l objet user
    user = await this.repository.save(user); // sauvegarder le user
    console.log(user);

    await this.nodemailer(tokenString, user); // envoi de mail

    const token = new Token();
    token.user = user;
    token.value = tokenString;
    this.tokenService.create(token);
    console.log(token);
    console.log(token.value);

    return true;
  }

  async signIn(email: string, password: string) {
    const labelError = new Error("Credentials are not valid");

    const user = await this.repository.findOne({
      where: { email },
      select: ["id", "password", "email", "pseudo"],
    });
    console.log(user);

    if (!user) {
      throw labelError;
    }
    const isValid = await verify(user.password, password);
    if (!isValid) {
      throw labelError;
      console.log("notValid");
    } else {
      console.log("isValid");
    }

    const secret1 = process.env.BORROW_JWT_SECRET;
    if (!secret1) {
      throw new Error("Pas de secret SETUP");
    }

    const token = await sign(
      { id: user.id, pseudo: user.pseudo, email: user.email },
      secret1
    );

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
}
