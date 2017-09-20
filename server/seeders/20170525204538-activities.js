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
    var activities = [];
    activities.push(
      { authorId: 1, cardId: 1, description: "created this card" },
      { authorId: 1, cardId: 2, description: "created this card" }
    );
    return queryInterface.bulkInsert("Activities", activities);
  },

  down: function(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete("Activities", null, {}, models.Activity);
  }
};
