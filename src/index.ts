import "reflect-metadata";

import express from "express";
import loaders from "./loaders";

import { AuthController } from "./controllers/auth.controller";
import { CategoryController } from "./controllers/category.controller";
import { ConsoleController } from "./controllers/console.controller";
import { EvaluationController } from "./controllers/evaluation.controller";
import { FriendshipController } from "./controllers/friendship.controller";
import { FriendshipStatusController } from "./controllers/frienship-status.controller";
import { ItemStatusController } from "./controllers/item-status.controller";
import { ItemController } from "./controllers/item.controller";
import { LoanStatusController } from "./controllers/loan-status.controller";
import { LoanController } from "./controllers/loan.controller";
import { OpinionController } from "./controllers/opinion.controller";
import { TagController } from "./controllers/tag.controller";
import { UserController } from "./controllers/user.controller";
import { FriendshipDemandController } from "./controllers/friendship-demand.controller";

async function startServer() {
  // Récupération de l'application initiale
  const app = express();

  // Chargement des différent loader
  await loaders(app);

  // Ajout des différentes route de votre application
  AuthController(app),
    CategoryController(app),
    ConsoleController(app),
    EvaluationController(app),
    FriendshipController(app),
    FriendshipDemandController(app),
    FriendshipStatusController(app),
    ItemStatusController(app),
    ItemController(app),
    LoanStatusController(app),
    LoanController(app),
    OpinionController(app),
    TagController(app),
    UserController(app);

  // Démarrage du serveur une fois que tout est correctement init
  app.listen(3000, () => console.log("Express server is running"));
}

startServer();
