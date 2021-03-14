import jwt from "jsonwebtoken";
import User from "../models/User";
import ServerError from "../../utils/ServerError";
import authConfig from "../../config/auth";

class AuthService {
  async authenticate(data) {
    const userSaved = await User.findOne({
      where: {
        email: data.email
      }
    });

    if (!userSaved) {
      throw new ServerError("Usuário não encontrado", 400, "warn");
    }
    if (!(await userSaved.checkPassword(data.password))) {
      throw new ServerError("Senha inválida", 400, "warn");
    }

    const token = jwt.sign({ userSaved }, authConfig.secret, {
      expiresIn: authConfig.expiresIn
    });

    return token;
  }
}

export default new AuthService();
