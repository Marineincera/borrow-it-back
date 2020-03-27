import { Application } from 'express';

import { commonController } from '../core/abstract.controller';
import { ItemService } from '../services/item.service';

/**
 * Ce controller vous servira de modèle pour construire vos différent controller
 * Le controlle rest la partie de l'application qui est en charge de la reception
 * des requetes http.
 *
 * @param app l'application express
 */
export const ItemController = (app: Application) => {

    const itemService = new ItemService();

    const itemRouter = commonController(itemService);

    // Ajoutez les nouvelles routes ici

    app.use('/items', itemRouter);
};