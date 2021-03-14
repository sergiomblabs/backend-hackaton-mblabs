import * as Yup from "yup";

import AuthService from "../services/AuthService";
import ServerError from "../../utils/ServerError";

class AuthController {
  async authenticate(req, res) {
    const valid = await Yup.object()
      .shape({
        email: Yup.string().required(),
        password: Yup.string().required()
      })
      .isValid(req.body);

    if (!valid) {
      throw new ServerError("Erro de validação", 400, "warn");
    }

    const token = await AuthService.authenticate(req.body);

    return res
      .json(token)
      .status(202)
      .end();
  }
}

export default new AuthController();
