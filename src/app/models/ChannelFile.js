import { Model, DataTypes } from "sequelize";

class ChannelMassage extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true
        },
        title: DataTypes.STRING,
        url: DataTypes.STRING,
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
        tableName: "channel_file",
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

    this.belongsTo(models.Channel, {
      foreignKey: {
        name: "id_channel",
        field: "id_channel"
      },
      as: "channel"
    });
  }
}

export default ChannelMassage;
