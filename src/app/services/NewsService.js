import { v4 as uuidv4 } from "uuid";

import News from "../models/News";

class NewsService {
  async create(data) {
    const id = uuidv4();

    const createdNews = await News.create({
      id,
      title: data.title,
      description: data.description,
      image: data.image,
      created_by: "1d5c5b56-d321-4eb2-a0ba-bb3f4157df5d",
      updated_by: "1d5c5b56-d321-4eb2-a0ba-bb3f4157df5d"
    });

    return createdNews;
  }

  async getAll() {
    const NewsSaved = await News.findAll();

    return NewsSaved;
  }

  async getById(id) {
    const existingNews = await News.findByPk(id);

    return existingNews;
  }
}

export default new NewsService();
