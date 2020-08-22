import { Application, Request, Response } from "express";

import { commonController } from "../core/abstract.controller";
import { ItemService } from "../services/item.service";
import { TagService } from "../services/tag.service";

/**
 * Ce controller vous servira de modèle pour construire vos différent controller
 * Le controlle rest la partie de l'application qui est en charge de la reception
 * des requetes http.
 *
 * @param app l'application express
 */
export const ItemController = (app: Application) => {
  const itemService = new ItemService();
  const tagService = new TagService();

  const itemRouter = commonController(itemService);

  // Ajoutez les nouvelles routes ici
  itemRouter.get("/filter/:number", async (req: Request, res: Response) => {
    res.send(await itemService.getFilterItems(Number(req.params.number)));
  });

  itemRouter.get("/", async (req: Request, res: Response) => {
    res.send(await itemService.getAll());
  });

  itemRouter.get("/:id", async (req: Request, res: Response) => {
    res.send(await itemService.getById(Number(req.params.id)));
  });

  app.use("/items", itemRouter);
};
