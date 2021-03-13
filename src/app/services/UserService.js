import { v4 as uuidv4 } from "uuid";

import User from "../models/User";
import ServerError from "../../utils/ServerError";

class UserService {
  async create(data) {
    const id = uuidv4();

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

    const createdUser = await User.create({
      id,
      email: data.email,
      pass: data.password,
      name: data.name,
      avatar: data.avatar
    });

    return createdUser;
  }

  async getAll() {
    const users = await User.findAll();

    return users;
  }

  async getById(id) {
    const existingUser = await User.findByPk(id);

    return existingUser;
  }
}

export default new UserService();
