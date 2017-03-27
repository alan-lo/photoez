'use strict';

const bcrypt = require('bcryptjs');
const saltRounds = 10;

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'Alan',
      lastName: 'Lo',
      email: 'alanlo893@gmail.com',
      userName: 'alanlo893',
      profile: 'Awesome Profile',
      password: bcrypt.hashSync('alan'),
      isAdmin: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      firstName: 'Guest',
      lastName: 'Guest',
      email: 'guest@gmail.com',
      userName: 'guest',
      profile: 'Guest Profile',
      password: bcrypt.hashSync('guest'),
      isAdmin: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
