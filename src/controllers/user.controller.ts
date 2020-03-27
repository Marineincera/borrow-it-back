import { Application } from 'express';

import { commonController } from '../core/abstract.controller';
import { UserService } from '../services/user.service';

/**
 * Ce controller vous servira de modèle pour construire vos différent controller
 * Le controlle rest la partie de l'application qui est en charge de la reception
 * des requetes http.
 *
 * @param app l'application express
 */
export const UserController = (app: Application) => {

    const userService = new UserService();

    const userRouter = commonController(userService);

    // Ajoutez les nouvelles routes ici

    app.use('/users', userRouter);
};