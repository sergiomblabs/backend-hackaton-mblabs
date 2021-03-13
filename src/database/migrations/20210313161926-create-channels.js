module.exports = {
  up: (queryInterface, Sequelize) => {
    const ChannelsTable = queryInterface.createTable("channels", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING
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

    return ChannelsTable;
  },

  down: queryInterface => queryInterface.dropTable("channels")
};
