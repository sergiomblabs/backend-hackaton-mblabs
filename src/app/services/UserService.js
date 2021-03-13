import { v4 as uuidv4 } from "uuid";

import User from "../models/User";
import ServerError from "../../utils/ServerError";

/**
 * Service class to perform user related operations.
 */
class UserService {
  /**
   * Create a User
   *
   * @param {object} data object with all infos needs to create a user
   * @returns a promise that resolves object of created user
   */
  async createUser(data) {
    const id = uuidv4();

    const existingUser = await User.findOne({
      where: {
        email: data.email
      }
    });

    if (existingUser) {
      throw new ServerError(
        "Já existe um usuário cadastrado com este e-mail",
        409,
        "warn"
      );
    }

    // crete user in database
    const createdUser = await User.create({
      id,
      email: data.email,
      pass: data.password,
      name: data.name,
      avatar: data.avatar
    });

    return createdUser;
  }

  /**
   * Get user from id
   *
   * @param {string} id the user's provider id, either it's email for custom login, or a facebook access token
   * @returns a promise that resolves to the cognito identify id
   */
  async getUser(id) {
    const existingUser = await User.findByPk(id);

    return existingUser;
  }
}

export default new UserService();
