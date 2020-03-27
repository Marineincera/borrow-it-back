import { Application } from 'express';

import { commonController } from '../core/abstract.controller';
import { ItemStatusService } from '../services/item-status.service';

/**
 * Ce controller vous servira de modèle pour construire vos différent controller
 * Le controlle rest la partie de l'application qui est en charge de la reception
 * des requetes http.
 *
 * @param app l'application express
 */
export const ItemStatusController = (app: Application) => {

    const itemStatusService = new ItemStatusService();

    const itemStatusRouter = commonController(itemStatusService);

    // Ajoutez les nouvelles routes ici

    app.use('/itemstatus', itemStatusRouter);
};