import * as Yup from "yup";

import UserService from "../services/UserService";
import ServerError from "../../utils/ServerError";

class UserController {
  async create(req, res) {
    const valid = await Yup.object()
      .shape({
        password: Yup.string().required(),
        name: Yup.string().required(),
        email: Yup.string().required(),
        avatar: Yup.string().required()
      })
      .isValid(req.body);

    if (!valid) {
      throw new ServerError("Erro de validação", 400, "warn");
    }

    const createdUser = await UserService.create(req.body);

    return res
      .json(createdUser)
      .status(202)
      .end();
  }

  async getAll(req, res) {
    const users = await UserService.getAll();

    return res
      .json(users)
      .status(202)
      .end();
  }
}

export default new UserController();
