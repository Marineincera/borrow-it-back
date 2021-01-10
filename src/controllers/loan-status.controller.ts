import { Application } from 'express';

import { commonController } from '../core/abstract.controller';
import { LoanStatusService } from '../services/loan-status.service';

/**
 * Ce controller vous servira de modèle pour construire vos différent controller
 * Le controlle rest la partie de l'application qui est en charge de la reception
 * des requetes http.
 *
 * @param app l'application express
 */
export const LoanStatusController = (app: Application) => {

    const loanStatusService = new LoanStatusService();

    const loanStatusRouter = commonController(loanStatusService);

    // Ajoutez les nouvelles routes ici

    app.use('/loanstatus', loanStatusRouter);
};