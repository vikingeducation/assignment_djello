"use strict";
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable("UsersCards", {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      fixId: {
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      memberId: {
        type: Sequelize.INTEGER,
        unique: false
      },
      cardId: {
        type: Sequelize.INTEGER,
        unique: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW")
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable("UsersCards");
  }
};
