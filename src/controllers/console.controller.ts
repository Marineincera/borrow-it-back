import { Application, Request, Response } from 'express';

import { commonController } from '../core/abstract.controller';
import { ConsoleService } from '../services/console.service';

/**
 * Ce controller vous servira de modèle pour construire vos différent controller
 * Le controlle rest la partie de l'application qui est en charge de la reception
 * des requetes http.
 *
 * @param app l'application express
 */
export const ConsoleController = (app: Application) => {

    const consoleService = new ConsoleService();

    const consoleRouter = commonController(consoleService);

    // Ajoutez les nouvelles routes ici
    consoleRouter.get('/', async (req: Request, res: Response) => {
        res.send(await consoleService.getAll());
    });

    consoleRouter.get('/:id', async (req: Request, res: Response) => {
        res.send(await consoleService.getById(Number(req.params.id)));
    });

    app.use('/consoles', consoleRouter);
};