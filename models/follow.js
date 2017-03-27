'use strict';
module.exports = function(sequelize, DataTypes) {
  var Follow = sequelize.define('Follow', {
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  }, {
    classMethods: {
      associate: function(models) {
       Follow.belongsTo(models.User);
       Follow.belongsTo(models.Post);
      }
    }
  });
  return Follow;
};
