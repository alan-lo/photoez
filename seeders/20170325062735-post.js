'use strict';
const faker = require('faker');

module.exports = {
  up: function (queryInterface, Sequelize) {
    const picPath = '/images/'
    let photos = ['cat.jpg',
                  'checkmated.jpg',
                  'easter-eggs.jpg',
                  'house.jpg',
                  'oranges.jpg',
                  'photo-camera.jpg',
                  'planet.jpg',
                  'purple-flower.jpg',
                  'valentines-day.jpg',
                  'food.jpg'
                  ];

    function getPhotoURL(index){
      return picPath + photos[index];
    }

    let posts = [];
    let numPosts = 10;

    for (let i=0; i < numPosts; i++){
      if (i < 5) {
        posts.push(
        {
          title: faker.lorem.words(3),
          body: faker.lorem.paragraphs(2),
          imageURL: getPhotoURL(i),
          UserId: 1,
          AlbumId: (Math.floor(Math.random() * 2) + 1),
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }else{
        posts.push(
        {
          title: faker.lorem.words(3),
          body: faker.lorem.paragraphs(2),
          imageURL: getPhotoURL(i),
          UserId: 2,
          AlbumId: (Math.floor(Math.random() * 2) + 1),
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    }
  return queryInterface.bulkInsert('Posts', posts, {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Posts', null, {});
  }
};
