import { AuthService } from "./../services/auth.service";
import express, { Router, Request, Response, Application } from "express";

/**
 * Ce controller vous servira de modèle pour construire vos différent controller
 * Le controlle rest la partie de l'application qui est en charge de la reception
 * des requetes http.
 *
 * @param app l'application express
 */
export const AuthController = (app: Application) => {
  const AuthRouter: Router = express.Router();
  const authService = new AuthService();

  AuthRouter.post("/signup", async (req: Request, res: Response) => {
    const user = req.body;
    console.log(user);

    try {
      await authService.signup(user);
      res.sendStatus(204);
    } catch (error) {
      if (error.message === "ALREADY_EXIST") {
        res.status(409).send("Informations déjà utilisées");
      } else {
        res.status(409).send("Erreur lors de l'inscription");
      }
    }
  });

  AuthRouter.post("/signin", async (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
      const { token, user } = await authService.signIn(email, password);
      res.set("access-control-expose-headers", "JWT_TOKEN");
      res.set("JWT_TOKEN", token);
      res.send(user);
    } catch (error) {
      if (error.message === "NOT ACTIVE") {
        res.status(409).send(error);
      } else {
        res.status(400).send("L'email ou le mot de passe est erroné");
      }
    }
  });
  AuthRouter.get(
    "/confirmation/:token",
    async (req: Request, res: Response) => {
      const token = req.params.token;
      try {
        await authService.isConfirmed(token);
        // Si le user a activé le mail de confirmation, il est redirigé vers la page de connexion du front
        res.redirect("http://localhost:4200/");
      } catch (error) {
        res.status(400).send("Lien invalide");
      }
    }
  );
  // Faire error pour connection

  // Verification du user
  AuthRouter.post("/verification", async (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
      const user = await authService.verif(email, password);
      res.send(user);
    } catch (error) {
      res.status(400).send("L'email ou le mot de passe est erroné");
    }
  });

  app.use("/auth", AuthRouter);
};
