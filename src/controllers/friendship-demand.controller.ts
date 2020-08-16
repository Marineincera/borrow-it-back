import { Application, Request, Response } from "express";

import { commonController } from "../core/abstract.controller";
import { FriendshipService } from "../services/friendship.service";
import { FriendshipDemandService } from "../services/friendship-demand.service";

/**
 * Ce controller vous servira de modèle pour construire vos différent controller
 * Le controlle rest la partie de l'application qui est en charge de la reception
 * des requetes http.
 *
 * @param app l'application express
 */
export const FriendshipDemandController = (app: Application) => {
  const friendshipDemandService = new FriendshipDemandService();

  const friendshipDemandRouter = commonController(friendshipDemandService);

  // Ajoutez les nouvelles routes ici
  friendshipDemandRouter.get("/", async (req: Request, res: Response) => {
    res.send(await friendshipDemandService.getAll());
  });

  friendshipDemandRouter.get("/:id", async (req: Request, res: Response) => {
    res.send(await friendshipDemandService.getById(Number(req.params.id)));
  });

  app.use("/friendshipdemands", friendshipDemandRouter);
};
