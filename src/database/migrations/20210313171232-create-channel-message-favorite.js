module.exports = {
  up: (queryInterface, Sequelize) => {
    const ChannelMessagesFavorite = queryInterface.createTable(
      "channel_messages_favorite",
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID
        },
        id_user: {
          type: Sequelize.UUID,
          references: {
            model: "users",
            key: "id"
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL"
        },
        id_message: {
          type: Sequelize.UUID,
          references: {
            model: "channel_messages",
            key: "id"
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL"
        },
        created_by: {
          type: Sequelize.UUID,
          references: {
            model: "users",
            key: "id"
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL"
        },
        updated_by: {
          type: Sequelize.UUID,
          references: {
            model: "users",
            key: "id"
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL"
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: new Date()
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: new Date()
        },
        deleted_at: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }
    );

    return ChannelMessagesFavorite;
  },

  down: queryInterface => queryInterface.dropTable("channel_messages_favorite")
};
