'use strict';
const faker = require('faker');

module.exports = {
  up: function (queryInterface, Sequelize) {
    const posts = Array.from(
      {length:20},
      (value, index) => ({
        title: faker.lorem.words(3),
        body: faker.lorem.paragraphs(2),
        imageURL: '/images/purple-flower.jpg',
        UserId: 1,
        AlbumId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    )
  return queryInterface.bulkInsert('Posts', posts, {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Posts', null, {});
  }
};
