import { Model, DataTypes } from "sequelize";

class ChannelUser extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true
        },
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
        tableName: "channel_users",
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

    this.belongsTo(models.User, {
      foreignKey: {
        name: "id_user",
        field: "id_user"
      },
      as: "users"
    });

    this.belongsTo(models.Channel, {
      foreignKey: {
        name: "id_channel",
        field: "id_channel"
      },
      as: "channels"
    });
  }
}

export default ChannelUser;
