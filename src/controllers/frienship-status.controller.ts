import { Application, Request, Response } from "express";

import { commonController } from "../core/abstract.controller";
import { FriendshipStatusService } from "../services/friendship-status.service";

/**
 * Ce controller vous servira de modèle pour construire vos différent controller
 * Le controlle rest la partie de l'application qui est en charge de la reception
 * des requetes http.
 *
 * @param app l'application express
 */
export const FriendshipStatusController = (app: Application) => {
  const friendshipStatusService = new FriendshipStatusService();

  const friendshipStatusRouter = commonController(friendshipStatusService);

  // Ajoutez les nouvelles routes ici

  app.use("/friendshipstatus", friendshipStatusRouter);
};
