import { v4 as uuidv4 } from "uuid";

import ServerError from "../../utils/ServerError";

import Channel from "../models/Channel";
import User from "../models/User";
import ChannelUser from "../models/ChannelUser";

const { Op } = require("sequelize");

class ChannelService {
  async create(data) {
    const id = uuidv4();

    const createdChannel = await Channel.create({
      id,
      title: data.title,
      description: data.description,
      created_by: "1d5c5b56-d321-4eb2-a0ba-bb3f4157df5d",
      updated_by: "1d5c5b56-d321-4eb2-a0ba-bb3f4157df5d"
    });

    return createdChannel;
  }

  async getAll() {
    const channels = await ChannelUser.findAll({
      include: [
        {
          model: User,
          as: "user"
        },
        {
          model: Channel,
          as: "channel"
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
          as: "user"
        }
      ]
    });

    return channel;
  }

  async addUser(data) {
    const id = uuidv4();

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
      id,
      id_user: data.userId,
      id_channel: data.channelId,
      created_by: "1d5c5b56-d321-4eb2-a0ba-bb3f4157df5d",
      updated_by: "1d5c5b56-d321-4eb2-a0ba-bb3f4157df5d"
    });

    return this.getById(data.channelId);
  }
}

export default new ChannelService();
