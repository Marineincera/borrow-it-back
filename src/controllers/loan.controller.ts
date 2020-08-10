import { Application, Request, Response } from "express";

import { commonController } from "../core/abstract.controller";
import { LoanService } from "../services/loan.service";

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
  loanRouter.post("/", async (req: Request, res: Response) => {
    res.send(await loanService.add(req.body));
  });

  app.use("/loans", loanRouter);
};
