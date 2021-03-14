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
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW
        },
        updated_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW
        },
        deleted_at: {
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
    this.belongsTo(models.User, {
      foreignKey: {
        name: "created_by",
        field: "created_by"
      },
      as: "user"
    });

    this.belongsTo(models.User, {
      foreignKey: {
        name: "updated_by",
        field: "updated_by"
      }
    });
  }
}

export default HandoutComment;
