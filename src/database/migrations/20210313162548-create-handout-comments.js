module.exports = {
  up: (queryInterface, Sequelize) => {
    const HandoutCommentTable = queryInterface.createTable("handout_comments", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      text: {
        allowNull: false,
        type: Sequelize.STRING
      },
      id_handout: {
        type: Sequelize.UUID,
        references: {
          model: "handouts",
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

    return HandoutCommentTable;
  },

  down: queryInterface => queryInterface.dropTable("handout_comments")
};
