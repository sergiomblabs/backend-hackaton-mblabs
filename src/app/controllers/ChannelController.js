import * as Yup from "yup";

import ChannelService from "../services/ChannelService";
import ServerError from "../../utils/ServerError";

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

    const createdChannel = await ChannelService.create();

    return res
      .json(createdChannel)
      .status(202)
      .end();
  }

  async getAll(req, res) {
    const channels = await ChannelService.getAll();

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

    const channel = await ChannelService.getById(id);

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

    const channelSaved = await ChannelService.addUser(req.body);

    return res
      .json(channelSaved)
      .status(202)
      .end();
  }
}

export default new ChannelController();
