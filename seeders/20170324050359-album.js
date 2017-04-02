'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Albums', [{
      name: 'Alan Album one',
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "Alan Album Two",
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Guest Album One',
      UserId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Guest Album Two',
      UserId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Albums', null, {});
  }
};
