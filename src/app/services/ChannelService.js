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
      title: data.body.title,
      description: data.body.description,
      created_by: data.user.id,
      updated_by: data.user.id
    });

    return channelSaved;
  }

  async getAll(actorId) {
    const channels = await ChannelUser.findAll({
      where: {
        id_user: actorId
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

  async getById(id, actorId) {
    const channel = await ChannelUser.findAll({
      where: {
        id_channel: id,
        id_user: actorId
      },
      include: [
        {
          model: User,
          as: "users"
        }
      ]
    });

    if (!channel) {
      throw new ServerError("Canal não encontrado", 409, "warn");
    }

    return channel;
  }

  async addUser(data) {
    const userSaved = await User.findByPk(data.body.userId);
    if (!userSaved) {
      throw new ServerError("Usuário não encontrado", 409, "warn");
    }

    const channelSaved = await Channel.findByPk(data.body.channelId);
    if (!channelSaved) {
      throw new ServerError("Canal não encontrado", 409, "warn");
    }

    const channelUserSaved = await ChannelUser.findOne({
      where: {
        [Op.and]: [
          { id_user: data.body.userId },
          { id_channel: data.body.channelId }
        ]
      }
    });
    if (channelUserSaved) {
      throw new ServerError("Usuário ja esta no canal", 409, "warn");
    }

    await ChannelUser.create({
      id: uuidv4(),
      id_user: data.body.userId,
      id_channel: data.body.channelId,
      created_by: data.user.id,
      updated_by: data.user.id
    });

    return this.getById(data.body.channelId);
  }

  async sendMessage(data) {
    const channelSaved = await Channel.findByPk(data.body.id_channel);
    if (!channelSaved) {
      throw new ServerError("Canal não encontrado", 409, "warn");
    }

    await ChannelMessage.create({
      id: uuidv4(),
      id_channel: data.body.id_channel,
      text: data.body.text,
      created_by: data.user.id,
      updated_by: data.user.id
    });
  }

  async favoriteMessage(data) {
    const messageSaved = await ChannelMessage.findByPk(data.body.id_message);
    if (!messageSaved) {
      throw new ServerError("Mensagem não encontrada", 409, "warn");
    }
    const existFavoriteMessage = await ChannelMessageFavorite.findOne({
      where: {
        id_user: data.user.id,
        id_message: data.body.id_message
      }
    });
    if (existFavoriteMessage) {
      await ChannelMessageFavorite.destroy({
        where: {
          id_user: data.user.id,
          id_message: data.body.id_message
        }
      });
    }

    await ChannelMessageFavorite.create({
      id: uuidv4(),
      id_user: data.user.id,
      id_message: data.body.id_message,
      created_by: data.user.id,
      updated_by: data.user.id
    });
  }

  async getFavoriteMessages(actorId) {
    const favoriteMessages = await ChannelMessageFavorite.findAll({
      where: {
        id_user: actorId
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
