import * as Yup from "yup";

import HandoutService from "../services/HandoutService";
import ServerError from "../../utils/ServerError";

class HandoutController {
  async create(req, res) {
    const valid = await Yup.object()
      .shape({
        title: Yup.string().required(),
        description: Yup.string().required(),
        fixed: Yup.bool().required()
      })
      .isValid(req.body);

    if (!valid) {
      throw new ServerError("Erro de validação", 400, "warn");
    }

    const handoutSaved = await HandoutService.create(req.body);

    return res
      .json(handoutSaved)
      .status(202)
      .end();
  }

  async getAll(req, res) {
    const handouts = await HandoutService.getAll();

    return res
      .json(handouts)
      .status(202)
      .end();
  }

  async getById(req, res) {
    const { id } = req.params;

    if (!id) {
      throw new ServerError("Erro de validação", 400, "warn");
    }

    const handoutSaved = await HandoutService.getById(id);

    return res
      .json(handoutSaved)
      .status(202)
      .end();
  }

  async createComment(req, res) {
    const valid = await Yup.object()
      .shape({
        id_handout: Yup.string().required(),
        text: Yup.string().required()
      })
      .isValid(req.body);

    if (!valid) {
      throw new ServerError("Erro de validação", 400, "warn");
    }

    const createdHandoutComment = await HandoutService.createComment(req.body);

    return res
      .json(createdHandoutComment)
      .status(202)
      .end();
  }
}

export default new HandoutController();
