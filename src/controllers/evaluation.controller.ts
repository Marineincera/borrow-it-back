import { Application, Request, Response } from 'express';

import { commonController } from '../core/abstract.controller';
import { EvaluationService } from '../services/evaluation.service';

/**
 * Ce controller vous servira de modèle pour construire vos différent controller
 * Le controlle rest la partie de l'application qui est en charge de la reception
 * des requetes http.
 *
 * @param app l'application express
 */
export const EvaluationController = (app: Application) => {

    const evaluationService = new EvaluationService();

    const evaluationRouter = commonController(evaluationService);

    // Ajoutez les nouvelles routes ici
    evaluationRouter.get('/', async (req: Request, res: Response) => {
        res.send(await evaluationService.getAll());
    });

    evaluationRouter.get('/:id', async (req: Request, res: Response) => {
        res.send(await evaluationService.getById(Number(req.params.id)));
    });

    app.use('/evaluations', evaluationRouter);
};