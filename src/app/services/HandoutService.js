import { v4 as uuidv4 } from "uuid";

import ServerError from "../../utils/ServerError";
import Handout from "../models/Handout";
import HandoutComment from "../models/HandoutComment";

class HandoutService {
  async create(data) {
    const handoutSaved = await Handout.create({
      id: uuidv4(),
      title: data.title,
      description: data.description,
      fixed: data.fixed,
      created_by: "1d5c5b56-d321-4eb2-a0ba-bb3f4157df5d",
      updated_by: "1d5c5b56-d321-4eb2-a0ba-bb3f4157df5d"
    });

    return handoutSaved;
  }

  async getAll() {
    const handouts = await Handout.findAll({
      order: [
        ["fixed", "DESC"],
        ["created_at", "ASC"]
      ],
      include: [
        {
          model: HandoutComment,
          as: "comments"
        }
      ]
    });

    return handouts;
  }

  async getById(id) {
    const handoutSaved = await Handout.findAll({
      where: {
        id
      },
      include: [
        {
          model: HandoutComment,
          as: "comments"
        }
      ]
    });

    return handoutSaved;
  }

  async createComment(data) {
    const handoutSaved = await Handout.findByPk(data.id_handout);
    if (!handoutSaved) {
      throw new ServerError("Comunicado não encontrado", 400, "warn");
    }

    const handoutCommentSaved = await HandoutComment.create({
      id: uuidv4(),
      id_handout: data.id_handout,
      text: data.text,
      created_by: "1d5c5b56-d321-4eb2-a0ba-bb3f4157df5d",
      updated_by: "1d5c5b56-d321-4eb2-a0ba-bb3f4157df5d"
    });

    return this.getById(handoutCommentSaved.id_handout);
  }
}

export default new HandoutService();
