import * as Yup from "yup";

import ChannelService from "../services/ChannelService";
import ChannelMessage from "../models/ChannelMassage";
import ServerError from "../../utils/ServerError";

const socketio = require("socket.io");

class ChannelController {
  async create(req, res) {
    const valid = await Yup.object()
      .shape({
        title: Yup.string().required(),
        description: Yup.string().required()
      })
      .isValid(req.body);

    if (!valid) {
      throw new ServerError("Erro de validação", 400, "warn");
    }

    const channelSaved = await ChannelService.create(req);

    return res
      .json(channelSaved)
      .status(202)
      .end();
  }

  async getAll(req, res) {
    const channels = await ChannelService.getAll(req.user.id);

    return res
      .json(channels)
      .status(202)
      .end();
  }

  async getById(req, res) {
    const { id } = req.params;

    if (!id) {
      throw new ServerError("Erro de validação", 400, "warn");
    }

    const channel = await ChannelService.getById(id, req.user.id);

    return res
      .json(channel)
      .status(202)
      .end();
  }

  async addUser(req, res) {
    const valid = await Yup.object()
      .shape({
        userId: Yup.string().required(),
        channelId: Yup.string().required()
      })
      .isValid(req.body);

    if (!valid) {
      throw new ServerError("Erro de validação", 400, "warn");
    }

    const channelSaved = await ChannelService.addUser(req);

    return res
      .json(channelSaved)
      .status(202)
      .end();
  }

  async sendMessage(req, res) {
    const valid = await Yup.object()
      .shape({
        id_channel: Yup.string().required(),
        text: Yup.string().required()
      })
      .isValid(req.body);

    if (!valid) {
      throw new ServerError("Erro de validação", 400, "warn");
    }

    await ChannelService.sendMessage(req);

    return res.status(202).end();
  }

  async favoriteMessage(req, res) {
    const valid = await Yup.object()
      .shape({
        id_message: Yup.string().required()
      })
      .isValid(req.body);

    if (!valid) {
      throw new ServerError("Erro de validação", 400, "warn");
    }

    await ChannelService.favoriteMessage(req);

    return res.status(202).end();
  }

  async getFavoriteMessages(req, res) {
    const favoriteMessages = await ChannelService.getFavoriteMessages(
      req.user.id
    );
    return res
      .json(favoriteMessages)
      .status(202)
      .end();
  }

  async deleteMessage(req, res) {
    const { id } = req.params;

    if (!id) {
      throw new ServerError("Erro de validação", 400, "warn");
    }
    await ChannelService.deleteMessage(id);
    return res.status(202).end();
  }

  async refreshMessages(req) {
    socketio.on("connection", socket => {
      socket.on("refreshMessages", data => {
        ChannelMessage.findAll({
          where: {
            id_channel: req.body.id_channel
          }
        })
          .then(res => {
            socket.emit("refreshMessages", res.row);
          })
          .catch(() => {});

        socket.broadcast.emit("refreshMessages", data);
      });

      socket.on("disconnect", () => {});
    });
  }
}

export default new ChannelController();
