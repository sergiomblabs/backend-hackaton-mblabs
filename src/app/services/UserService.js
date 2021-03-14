import { v4 as uuidv4 } from "uuid";

import User from "../models/User";
import ServerError from "../../utils/ServerError";

class UserService {
  async create(data) {
    const existingUser = await User.findOne({
      where: {
        email: data.email
      }
    });
    if (existingUser) {
      throw new ServerError(
        "Já existe um usuário cadastrado com este e-mail",
        409,
        "warn"
      );
    }

    const userSaved = await User.create({
      id: uuidv4(),
      email: data.email,
      pass: data.password,
      name: data.name,
      avatar: data.avatar
    });

    return userSaved;
  }

  async getAll() {
    const users = await User.findAll();

    return users;
  }

  async getById(id) {
    const userSaved = await User.findByPk(id);

    return userSaved;
  }
}

export default new UserService();
