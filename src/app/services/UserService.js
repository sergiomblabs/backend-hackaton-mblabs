import { v4 as uuidv4 } from "uuid";

import User from "../models/User";
import ServerError from "../../utils/ServerError";
import ChannelMassageFavorite from "../models/ChannelMassageFavorite";
import ChannelMassage from "../models/ChannelMassage";

class UserService {
  async create(data) {
    const existingUser = await User.findOne({
      where: {
        email: data.body.email
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
      email: data.body.email,
      pass: data.body.password,
      name: data.body.name,
      avatar: data.body.avatar
    });

    return userSaved;
  }

  async getAll() {
    const users = await User.findAll();

    return users;
  }

  async getById(id) {
    const userSaved = await User.findByPk(id);

    if (!userSaved) {
      throw new ServerError("Usuário não encontrado", 409, "warn");
    }

    return userSaved;
  }

  async getWithMessagesById(id) {
    const userSaved = await User.findByPk(id);
    if (!userSaved) {
      throw new ServerError("Usuário não encontrado", 409, "warn");
    }

    const favoriteMessages = await ChannelMassageFavorite.findOne({
      where: {
        id_user: userSaved.id
      },
      include: [
        {
          model: ChannelMassage,
          as: "messages"
        }
      ]
    });

    return { userSaved, favoriteMessages };
  }
}

export default new UserService();
