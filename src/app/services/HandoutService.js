import { v4 as uuidv4 } from "uuid";

import Handout from "../models/Handout";

class HandoutService {
  async create(data) {
    const id = uuidv4();

    const createdHandout = await Handout.create({
      id,
      title: data.title,
      description: data.description,
      fixed: data.fixed,
      created_by: "1d5c5b56-d321-4eb2-a0ba-bb3f4157df5d",
      updated_by: "1d5c5b56-d321-4eb2-a0ba-bb3f4157df5d"
    });

    return createdHandout;
  }

  async getAll() {
    const handouts = await Handout.findAll();

    return handouts;
  }

  async getById(id) {
    const existingHandout = await Handout.findByPk(id);

    return existingHandout;
  }
}

export default new HandoutService();
