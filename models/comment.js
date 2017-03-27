'use strict';
module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define('Comment', {
    body: DataTypes.TEXT,
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  }, {
    classMethods: {
      associate: function(models) {
        Comment.belongsTo(models.User);
        Comment.belongsTo(models.Post);
      }
    }
  });
  return Comment;
};
