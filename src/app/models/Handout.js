import { Model, DataTypes } from "sequelize";

class Handout extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true
        },
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        fixed: DataTypes.BOOLEAN,
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
        tableName: "handouts",
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
      }
    });

    this.belongsTo(models.User, {
      foreignKey: {
        name: "updated_by",
        field: "updated_by"
      }
    });

    this.hasMany(models.HandoutComment, {
      foreignKey: {
        name: "id_handout",
        field: "id_handout"
      },
      as: "comments"
    });
  }
}

export default Handout;
