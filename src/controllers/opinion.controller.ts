import { Application } from 'express';

import { commonController } from '../core/abstract.controller';
import { OpinionService } from '../services/opinion.service';

/**
 * Ce controller vous servira de modèle pour construire vos différent controller
 * Le controlle rest la partie de l'application qui est en charge de la reception
 * des requetes http.
 *
 * @param app l'application express
 */
export const OpinionController = (app: Application) => {

    const opinionService = new OpinionService();

    const opinionRouter = commonController(opinionService);

    // Ajoutez les nouvelles routes ici

    app.use('/opinion', opinionRouter);
};