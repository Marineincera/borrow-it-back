import { Application, Request, Response, Router } from "express";

import { commonController } from "../core/abstract.controller";
import { UserService } from "../services/user.service";
import jwt = require("express-jwt");
import jwt2 = require("jsonwebtoken");


/**
 * Ce controller vous servira de modèle pour construire vos différent controller
 * Le controlle rest la partie de l'application qui est en charge de la reception
 * des requetes http.
 *
 * @param app l'application express
 */
export const UserController = (app: Application) => {
  const userService = new UserService();

  let userRouter = Router();
  // Ajoutez les nouvelles routes ici
  if (!process.env.BORROW_JWT_SECRET) {
    throw new Error("Secret is not defined");
  }
  userRouter.use(
    jwt({ secret: process.env.BORROW_JWT_SECRET, algorithms: ["HS256"] })
  );

  const secret1 = process.env.BORROW_JWT_SECRET;

  if (!secret1) {
    throw new Error("Pas de secret SETUP");
  }
  userRouter.use(jwt({ secret: secret1, algorithms: ["HS256"] })); // secret = variable d'environnement

  userRouter.get("/", async (req: Request, res: Response) => {
    res.send(await userService.getAll());
  });

  userRouter.get("/:id", async (req: Request, res: Response) => {
    res.send(await userService.getById(Number(req.params.id)));
  });

  userRouter.get("/search/me", async (req: Request, res: Response) => {
    const user = await userService.getMe((req as any).user.id);

    if (!user) {
      res.status(400).send("Aucun utilisateur trouvé pour ce token");
    }
    res.send(user);
  });

  userRouter = commonController(userService, userRouter);
  app.use("/users", userRouter);
};
