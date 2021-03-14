import { v4 as uuidv4 } from "uuid";

import News from "../models/News";

class NewsService {
  async create(data) {
    const createdNews = await News.create({
      id: uuidv4(),
      title: data.body.title,
      description: data.body.description,
      image: data.body.image,
      created_by: data.user.id,
      updated_by: data.user.id
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
