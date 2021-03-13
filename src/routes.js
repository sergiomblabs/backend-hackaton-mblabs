import { Router } from "express";
import cors from "cors";

import PingController from "./app/controllers/PingController";
import UserController from "./app/controllers/UserController";

import tokenMiddlware from "./app/middlewares/token";

const routes = new Router();
routes.use(cors());

routes.use(tokenMiddlware);

// ping to health of api
routes.get("/ping", (req, res, next) =>
  PingController.get(req, res, next).catch(next)
);

// create user
routes.post("/user", (req, res, next) =>
  UserController.createUser(req, res, next).catch(next)
);

export default routes;
