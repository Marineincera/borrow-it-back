import 'reflect-metadata';

import express from 'express';
import loaders from './loaders';

import { UserController } from './controller/user.controller';
import { CategoryController } from './controller/category.controller';
import { ItemStatusController } from './controller/item-status.controller';
import { ItemController } from './controller/item.controller';
import { LoanStatusController } from './controller/loan-status.controller';
import { LoanController } from './controller/loan.controller';
import { OpinionController } from './controller/opinion.controller';
import { TagController } from './controller/tag.controller';

async function startServer() {
    // Récupération de l'application initiale
    const app = express();

    // Chargement des différent loader
    await loaders(app);

    // Ajout des différentes route de votre application
    CategoryController(app),
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