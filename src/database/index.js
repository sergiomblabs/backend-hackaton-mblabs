import Sequelize from "sequelize";
import path from "path";
import Umzug from "umzug";
import databaseConfig from "../config/database";

import UserModel from "../app/models/User";
import HandoutModel from "../app/models/Handout";
import HandoutCommentModel from "../app/models/HandoutComment";
import ChannelModel from "../app/models/Channel";
import NewsModel from "../app/models/News";
import ChannelUserModel from "../app/models/ChannelUser";
import ChannelMessageModel from "../app/models/ChannelMassage";
import ChannelMassageFavoriteModel from "../app/models/ChannelMassageFavorite";

const models = [
  UserModel,
  HandoutModel,
  HandoutCommentModel,
  ChannelModel,
  NewsModel,
  ChannelUserModel,
  ChannelMessageModel,
  ChannelMassageFavoriteModel
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // Create an empty object which can store our databases
    const db = {};

    // Extract the database information into an array
    const databases = Object.keys(databaseConfig.databases);

    // Loop over the array and create a new Sequelize instance for every database from config.js
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < databases.length; i++) {
      const database = databases[i];
      const dbPath = databaseConfig.databases[database];
      // Store the database connection in our db object
      db[database] = new Sequelize(
        dbPath.database,
        dbPath.username,
        dbPath.password,
        dbPath
      );
    }

    this.migrate(db.principal);

    models.map(model => model.init(db.principal));
    models.map(
      model => model.associate && model.associate(db.principal.models)
    );
  }

  /**
   * Apply all pending migrations.
   *
   * @param {Sequelize} sequelize the sequelize instance
   * @returns a promise that resolves after migrations are completed
   */
  migrate(sequelize) {
    const umzug = new Umzug({
      storage: "sequelize",

      storageOptions: {
        sequelize
      },

      migrations: {
        params: [sequelize.getQueryInterface(), Sequelize],
        path: path.join(__dirname, "./migrations")
      }
    });

    return umzug.up();
  }
}

export default new Database();
