import jwt from "jsonwebtoken";
import { promisify } from "util";

import authConfig from "../../config/auth";
import UserService from "../services/UserService";

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Token inválido" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    const userSaved = await UserService.getById(decoded.userSaved.id);
    req.user = userSaved;
  } catch (err) {
    return res.status(401).json({ message: "Usuário não autorizado" });
  }

  return next();
};
