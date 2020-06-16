import 'reflect-metadata';

import express from 'express';
import loaders from './loaders';

import { UserController } from './controllers/user.controller';
import { CategoryController } from './controllers/category.controller';
import { ConsoleController } from './controllers/console.controller';
import { ItemStatusController } from './controllers/item-status.controller';
import { ItemController } from './controllers/item.controller';
import { LoanStatusController } from './controllers/loan-status.controller';
import { LoanController } from './controllers/loan.controller';
import { OpinionController } from './controllers/opinion.controller';
import { TagController } from './controllers/tag.controller';
import { EvaluationController } from './controllers/evaluation.controller';

async function startServer() {
    // Récupération de l'application initiale
    const app = express();

    // Chargement des différent loader
    await loaders(app);

    // Ajout des différentes route de votre application
    CategoryController(app),
    ConsoleController(app),
    EvaluationController(app),
    ItemStatusController(app),
    ItemController(app),
    LoanStatusController(app),
    LoanController(app),
    OpinionController(app),
    TagController(app),
    UserController(app);

    // Démarrage du serveur une fois que tout est correctement init
    app.listen(3000, () => console.log('Express server is running'));
  }

startServer();