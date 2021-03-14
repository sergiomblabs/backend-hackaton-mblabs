import { v4 as uuidv4 } from "uuid";

import ServerError from "../../utils/ServerError";

import Channel from "../models/Channel";
import User from "../models/User";
import ChannelUser from "../models/ChannelUser";
import ChannelMessage from "../models/ChannelMassage";
import ChannelMessageFavorite from "../models/ChannelMassageFavorite";

const { Op } = require("sequelize");

class ChannelService {
  async create(data) {
    const channelSaved = await Channel.create({
      id: uuidv4(),
      title: data.title,
      description: data.description,
      created_by: "1d5c5b56-d321-4eb2-a0ba-bb3f4157df5d",
      updated_by: "1d5c5b56-d321-4eb2-a0ba-bb3f4157df5d"
    });

    return channelSaved;
  }

  async getAll() {
    const channels = await ChannelUser.findAll({
      where: {
        id_user: "1d5c5b56-d321-4eb2-a0ba-bb3f4157df5d"
      },
      include: [
        {
          model: Channel,
          as: "channels"
        }
      ]
    });

    return channels;
  }

  async getById(id) {
    const channel = await ChannelUser.findAll({
      where: {
        id_channel: id
      },
      include: [
        {
          model: User,
          as: "users"
        }
      ]
    });

    return channel;
  }

  async addUser(data) {
    const userSaved = await User.findByPk(data.userId);
    if (!userSaved) {
      throw new ServerError("Usuário não encontrado", 409, "warn");
    }

    const channelSaved = await Channel.findByPk(data.channelId);
    if (!channelSaved) {
      throw new ServerError("Canal não encontrado", 409, "warn");
    }

    const channelUserSaved = await ChannelUser.findOne({
      where: {
        [Op.and]: [{ id_user: data.userId }, { id_channel: data.channelId }]
      }
    });
    if (channelUserSaved) {
      throw new ServerError("Usuário ja esta no canal", 409, "warn");
    }

    await ChannelUser.create({
      id: uuidv4(),
      id_user: data.userId,
      id_channel: data.channelId,
      created_by: "1d5c5b56-d321-4eb2-a0ba-bb3f4157df5d",
      updated_by: "1d5c5b56-d321-4eb2-a0ba-bb3f4157df5d"
    });

    return this.getById(data.channelId);
  }

  async sendMessage(data) {
    const id = uuidv4();

    const channelSaved = await Channel.findByPk(data.id_channel);
    if (!channelSaved) {
      throw new ServerError("Canal não encontrado", 409, "warn");
    }

    await ChannelMessage.create({
      id,
      id_channel: data.channelId,
      text: data.text,
      created_by: "1d5c5b56-d321-4eb2-a0ba-bb3f4157df5d",
      updated_by: "1d5c5b56-d321-4eb2-a0ba-bb3f4157df5d"
    });
  }

  async favoriteMessage(data) {
    const messageSaved = await ChannelMessage.findByPk(data.id_message);
    if (!messageSaved) {
      throw new ServerError("Mensagem não encontrada", 409, "warn");
    }

    const existFavoriteMessage = await ChannelMessageFavorite.findOne({
      where: {
        id_user: "1d5c5b56-d321-4eb2-a0ba-bb3f4157df5d",
        id_message: data.id_message
      }
    });
    if (existFavoriteMessage) {
      await ChannelMessageFavorite.destroy({
        where: {
          id_user: "1d5c5b56-d321-4eb2-a0ba-bb3f4157df5d",
          id_message: data.id_message
        }
      });
    }

    await ChannelMessageFavorite.create({
      id: uuidv4(),
      id_user: "1d5c5b56-d321-4eb2-a0ba-bb3f4157df5d",
      id_message: data.id_message,
      created_by: "1d5c5b56-d321-4eb2-a0ba-bb3f4157df5d",
      updated_by: "1d5c5b56-d321-4eb2-a0ba-bb3f4157df5d"
    });
  }

  async getFavoriteMessages() {
    const favoriteMessages = await ChannelMessageFavorite.findAll({
      where: {
        id_user: "1d5c5b56-d321-4eb2-a0ba-bb3f4157df5d"
      },
      include: [
        {
          model: ChannelMessage,
          as: "messages"
        }
      ]
    });
    return favoriteMessages;
  }

  async deleteMessage(id) {
    await ChannelMessage.destroy({
      where: {
        id
      }
    });
  }
}
export default new ChannelService();
