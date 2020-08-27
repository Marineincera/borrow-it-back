import { Application, Request, Response, Router } from "express";

import { commonController } from "../core/abstract.controller";
import { UserService } from "../services/user.service";
import jwt = require("express-jwt");
import jwt2 = require("jsonwebtoken");
// upload avatar
import multer from "multer";
var upload = multer({ dest: "../uploads/" });

/**
 * Ce controller vous servira de modèle pour construire vos différent controller
 * Le controlle rest la partie de l'application qui est en charge de la reception
 * des requetes http.
 *
 * @param app l'application express
 */
export const UserController = (app: Application) => {
  const userService = new UserService();

  // upload avatar
  const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "../uploads/");
    },
    filename(req, file, cb) {
      const tab = file.originalname.split(".");
      cb(null, file.fieldname + "-" + Date.now() + "." + tab[tab.length - 1]);
    },
  });
  const upload = multer({ storage });
  ////////

  let userRouter = Router();
  // Ajoutez les nouvelles routes ici
  if (!process.env.BORROW_JWT_SECRET) {
    throw new Error("Secret is not defined");
  }
  userRouter.use(
    jwt({ secret: process.env.BORROW_JWT_SECRET, algorithms: ["HS256"] })
  );

  const secret1 = process.env.BORROW_JWT_SECRET;

  if (!secret1) {
    throw new Error("secret is missing");
  }
  userRouter.use(jwt({ secret: secret1, algorithms: ["HS256"] })); // secret = variable d'environnement

  userRouter.get("/", async (req: Request, res: Response) => {
    res.send(await userService.getAll());
  });

  userRouter.get("/:id", async (req: Request, res: Response) => {
    res.send(await userService.getById(Number(req.params.id)));
  });

  userRouter.get("/friends/", async (req: Request, res: Response) => {
    const friends = await userService.getFriendsByUser(
      parseInt((req as any).user.id, 10)
    );
    if (!friends) {
      res.status(400).send("Aucun utilisateur trouvé pour ce token");
    } else {
      res.send(friends);
    }
  });

  userRouter.get("/search/me", async (req: Request, res: Response) => {
    const user = await userService.getMe((req as any).user.id);
    if (!user) {
      res.status(400).send("Aucun utilisateur trouvé pour ce token");
    } else {
      res.send(user);
    }
  });

  userRouter.put("/modify/", async (req: Request, res: Response) => {
    const id = parseInt((req as any).user.id, 10);
    const user = req.body;
    const userUpdated = await userService.modifyAUser(id, user);
    if (!id) {
      res.status(400).send("Aucun utilisateur trouvé pour ce token");
    } else {
      res.send(userUpdated);
    }
  });

  userRouter.delete("/delete/:", async (req: Request, res: Response) => {
    const userToDelete = await userService.delete(
      parseInt((req as any).user.id, 10)
    );
    if (!userToDelete) {
      res.status(400).send("Aucun utilisateur trouvé pour ce token");
    } else {
      res.status(204).send("L'utilisateur a bien été supprimé");
    }
  });

  userRouter.get(
    "/search/keyword/:keyword",
    async (req: Request, res: Response) => {
      const keyword = req.params.keyword;
      try {
        res.send(await userService.getUsersByKeyword(keyword));
      } catch (error) {
        res.status(409).send("La requête n'a pas aboutie");
      }
    }
  );

  // Upload avatar

  userRouter.post(
    "/avatar/:",
    upload.single("avatar"),
    async (req: Request, res: Response) => {
      const document = req.body;
      const userId = parseInt((req as any).user.id, 10);
      if (!userId) {
        res.status(400).send("Aucun utilisateur trouvé pour ce token");
      } else {
        res.send(await userService.addAvatar(userId, req.file.filename));
      }
    }
  );

  userRouter = commonController(userService, userRouter);
  app.use("/users", userRouter);
};
