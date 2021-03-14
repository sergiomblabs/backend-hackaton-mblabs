import * as Yup from "yup";

import NewsService from "../services/NewsService";
import ServerError from "../../utils/ServerError";

class NewsController {
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

    const createdNews = await NewsService.create(req);

    return res
      .json(createdNews)
      .status(202)
      .end();
  }

  async getAll(req, res) {
    const News = await NewsService.getAll();

    return res
      .json(News)
      .status(202)
      .end();
  }

  async getById(req, res) {
    const { id } = req.params;

    if (!id) {
      throw new ServerError("Erro de validação", 400, "warn");
    }

    const News = await NewsService.getById(id);

    return res
      .json(News)
      .status(202)
      .end();
  }
}

export default new NewsController();
