import { Router } from "express";
import cors from "cors";

import PingController from "./app/controllers/PingController";
import UserController from "./app/controllers/UserController";
import HandoutController from "./app/controllers/HandoutController";
import ChannelController from "./app/controllers/ChannelController";
import NewsController from "./app/controllers/NewsController";

import tokenMiddlware from "./app/middlewares/token";

const routes = new Router();
routes.use(cors());

routes.use(tokenMiddlware);

/* ************* ping to health of api ************* */
routes.get("/ping", (req, res, next) =>
  PingController.get(req, res, next).catch(next)
);

/* ********************* User ********************* */
routes.post("/user", (req, res, next) =>
  UserController.create(req, res, next).catch(next)
);
routes.get("/user", (req, res, next) =>
  UserController.getAll(req, res, next).catch(next)
);

/* ********************* Handout ********************* */
routes.post("/handout", (req, res, next) =>
  HandoutController.create(req, res, next).catch(next)
);
routes.get("/handout", (req, res, next) =>
  HandoutController.getAll(req, res, next).catch(next)
);
routes.get("/handout/:id", (req, res, next) =>
  HandoutController.getById(req, res, next).catch(next)
);

/* ********************* Channel ********************* */
routes.post("/channel", (req, res, next) =>
  ChannelController.create(req, res, next).catch(next)
);
routes.get("/channel", (req, res, next) =>
  ChannelController.getAll(req, res, next).catch(next)
);
routes.get("/channel/:id", (req, res, next) =>
  ChannelController.getById(req, res, next).catch(next)
);
routes.post("/channel/add-user", (req, res, next) =>
  ChannelController.addUser(req, res, next).catch(next)
);

/* ********************* News ********************* */
routes.post("/news", (req, res, next) =>
  NewsController.create(req, res, next).catch(next)
);
routes.get("/news", (req, res, next) =>
  NewsController.getAll(req, res, next).catch(next)
);
routes.get("/news/:id", (req, res, next) =>
  NewsController.getById(req, res, next).catch(next)
);

export default routes;
