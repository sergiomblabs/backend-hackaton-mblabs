import { v4 as uuidv4 } from "uuid";

import ServerError from "../../utils/ServerError";
import Handout from "../models/Handout";
import User from "../models/User";
import HandoutComment from "../models/HandoutComment";

class HandoutService {
  async create(data) {
    const handoutSaved = await Handout.create({
      id: uuidv4(),
      title: data.body.title,
      description: data.body.description,
      fixed: data.body.fixed,
      created_by: data.user.id,
      updated_by: data.user.id
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
        },
        {
          attributes: ["name", "avatar"],
          model: User,
          as: "user"
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
          as: "comments",
          include: [
            {
              attributes: ["name", "avatar"],
              model: User,
              as: "user"
            }
          ]
        },
        {
          attributes: ["name", "avatar"],
          model: User,
          as: "user"
        }
      ]
    });

    return handoutSaved;
  }

  async createComment(data) {
    const handoutSaved = await Handout.findByPk(data.body.id_handout);
    if (!handoutSaved) {
      throw new ServerError("Comunicado não encontrado", 400, "warn");
    }

    const handoutCommentSaved = await HandoutComment.create({
      id: uuidv4(),
      id_handout: data.body.id_handout,
      text: data.body.text,
      created_by: data.user.id,
      updated_by: data.user.id
    });

    return this.getById(handoutCommentSaved.id_handout);
  }
}

export default new HandoutService();
