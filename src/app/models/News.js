import { Model, DataTypes } from "sequelize";

class News extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true
        },
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        image: DataTypes.STRING,
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
        tableName: "news",
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
      as: "created"
    });

    this.belongsTo(models.User, {
      foreignKey: {
        name: "updated_by",
        field: "updated_by"
      },
      as: "updated"
    });
  }
}

export default News;
