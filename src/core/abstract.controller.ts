import express, { Request, Response, Router } from 'express';
import { AbstractService } from './abstract.service';

/**
 * Ce controller vous servira de modèle pour construire vos différent controller
 * Le controller est la partie de l'application qui est en charge de la reception
 * des requetes http.
 *
 * @param app l'application express
 */
export const commonController = (service: AbstractService, commonRouter = Router()) => {

    commonRouter.get('/', async (req: Request, res: Response) => {
        res.send(await service.getAll());
    });

    commonRouter.get('/:id', async (req: Request, res: Response) => {
        res.send(await service.getById(Number(req.params.id)));
    });

    commonRouter.post('/', async (req: Request, res: Response) => {
        res.send(await service.add(req.body));
    });

    commonRouter.put('/update/:id', async (req: Request, res: Response) => {
        await service.update(parseInt(req.params.id, 10), req.body);
        res.send(204);
    });

    commonRouter.delete('/delete/:id', async (req: Request, res: Response) => {
        await service.delete(parseInt(req.params.id, 10));
        res.sendStatus(204);
    });

    return commonRouter;
};