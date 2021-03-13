import { Model, DataTypes } from "sequelize";
import bcrypt from "bcryptjs";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.STRING,
          primaryKey: true
        },
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        avatar: DataTypes.STRING,
        pass: DataTypes.VIRTUAL,
        password: DataTypes.STRING,
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW
        },
        updatedAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW
        },
        deletedAt: {
          type: DataTypes.DATE
        }
      },
      {
        sequelize,
        tableName: "user",
        timestamps: false
      }
    );

    this.addHook("beforeSave", async user => {
      if (user.pass) {
        const hash = await bcrypt.hash(user.pass, 8);

        user.password = hash.replace("$2b", "$2a");
      }
    });

    this.addHook("beforeUpdate", async user => {
      if (user.pass) {
        const hash = await bcrypt.hash(user.pass, 8);

        user.password = hash.replace("$2b", "$2a");
      }
    });

    return this;
  }

  async checkPassword(password) {
    // If the user has no password set, means it's a facebook user and should login using it
    if (!this.password) {
      return false;
    }

    return bcrypt.compare(password, this.password.replace("$2a", "$2b"));
  }
}

export default User;
