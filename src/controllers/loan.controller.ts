import { Application } from 'express';

import { commonController } from '../core/abstract.controller';
import { LoanService } from '../services/loan.service';

/**
 * Ce controller vous servira de modèle pour construire vos différent controller
 * Le controlle rest la partie de l'application qui est en charge de la reception
 * des requetes http.
 *
 * @param app l'application express
 */
export const LoanController = (app: Application) => {

    const loanService = new LoanService();

    const loanRouter = commonController(loanService);

    // Ajoutez les nouvelles routes ici

    app.use('/loan', loanRouter);
};