import { Application, Request, Response } from "express";

import { commonController } from "../core/abstract.controller";
import { FriendshipService } from "../services/friendship.service";

/**
 * Ce controller vous servira de modèle pour construire vos différent controller
 * Le controlle rest la partie de l'application qui est en charge de la reception
 * des requetes http.
 *
 * @param app l'application express
 */
export const FriendshipController = (app: Application) => {
  const friendshipService = new FriendshipService();

  const friendshipRouter = commonController(friendshipService);

  // Ajoutez les nouvelles routes ici
  friendshipRouter.get("/", async (req: Request, res: Response) => {
    res.send(await friendshipService.getAll());
  });

  friendshipRouter.get("/:id", async (req: Request, res: Response) => {
    res.send(await friendshipService.getById(Number(req.params.id)));
  });

  app.use("/friendships", friendshipRouter);
};
