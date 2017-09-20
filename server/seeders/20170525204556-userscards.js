"use strict";
const models = require("./../models");

module.exports = {
  up: function(queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    var userscards = [];
    userscards.push(
      { fixId: 2, memberId: 1, cardId: 1 },
      { fixId: 3, memberId: 2, cardId: 1 }
    );
    return queryInterface.bulkInsert("UsersCards", userscards);
  },

  down: function(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete("UsersCards", null, {}, models.UsersCards);
  }
};
