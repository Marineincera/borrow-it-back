import { Application } from 'express';

import { CategoryService } from '../services/category.service';
import { commonController } from '../core/abstract.controller';

/**
 * Ce controller vous servira de modèle pour construire vos différent controller
 * Le controlle rest la partie de l'application qui est en charge de la reception
 * des requetes http.
 *
 * @param app l'application express
 */
export const CategoryController = (app: Application) => {

    const categoryService = new CategoryService();

    const categoryRouter = commonController(categoryService);

    // Ajoutez les nouvelles routes ici

    app.use('/categories', categoryRouter);
};