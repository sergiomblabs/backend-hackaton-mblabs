import { Model, DataTypes } from "sequelize";

class ChannelMassageFavorite extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true
        },
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
        tableName: "channel_message_favorite",
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

    this.belongsTo(models.Users, {
      foreignKey: {
        name: "id_user",
        field: "id_user"
      },
      as: "user"
    });

    this.belongsTo(models.ChannelMassage, {
      foreignKey: {
        name: "id_message",
        field: "id_message"
      },
      as: "message"
    });
  }
}

export default ChannelMassageFavorite;
