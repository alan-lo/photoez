'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Albums', [{
      name: 'Alan',
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Alan2',
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Albums', null, {});
  }
};
