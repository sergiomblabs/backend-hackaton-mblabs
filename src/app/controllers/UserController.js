import * as Yup from "yup";

import UserService from "../services/UserService";
import ServerError from "../../utils/ServerError";

class UserController {
  /**
   * Changes a user password using a single use token.
   *
   * @param {Request} req the request object
   * @param {Response} res the response object
   * @returns a promise that resolves to void after the response is sent, response body is empty
   */
  async createUser(req, res) {
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

    const createdUser = await UserService.createUser(req.body);

    return res
      .json(createdUser)
      .status(202)
      .end();
  }
}

export default new UserController();
