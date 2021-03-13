import { Model, DataTypes } from "sequelize";

class HandoutComment extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true
        },
        text: DataTypes.STRING,
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
        tableName: "handout_comments",
        timestamps: false
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Users, {
      foreignKey: {
        name: "created_by",
        field: "created_by"
      },
      as: "user"
    });

    this.belongsTo(models.Users, {
      foreignKey: {
        name: "updated_by",
        field: "updated_by"
      },
      as: "user"
    });

    this.belongsTo(models.Handout, {
      foreignKey: {
        name: "id_handout",
        field: "id_handout"
      },
      as: "handout_comments"
    });
  }
}

export default HandoutComment;
