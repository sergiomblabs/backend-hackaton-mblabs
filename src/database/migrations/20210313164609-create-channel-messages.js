module.exports = {
  up: (queryInterface, Sequelize) => {
    const ChannelMessageTable = queryInterface.createTable("channel_messages", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      text: {
        allowNull: false,
        type: Sequelize.STRING
      },
      id_channel: {
        type: Sequelize.UUID,
        references: {
          model: "channels",
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
    });

    return ChannelMessageTable;
  },

  down: queryInterface => queryInterface.dropTable("channel_messages")
};
