import { Application, Request, Response } from "express";

import { commonController } from "../core/abstract.controller";
import { TagService } from "../services/tag.service";

/**
 * Ce controller vous servira de modèle pour construire vos différent controller
 * Le controlle rest la partie de l'application qui est en charge de la reception
 * des requetes http.
 *
 * @param app l'application express
 */
export const TagController = (app: Application) => {
  const tagService = new TagService();

  const tagRouter = commonController(tagService);

  // Ajoutez les nouvelles routes ici
  tagRouter.get("/search/:tag", async (req: Request, res: Response) => {
    const tag = req.params.tag;
    res.send(await tagService.getTagsByKeyword(tag));
  });

  app.use("/tags", tagRouter);
};
