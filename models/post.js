'use strict';
module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define('Post', {
    body: DataTypes.TEXT,
    title: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    AlbumId: DataTypes.INTEGER,
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  }, {
    classMethods: {
      associate: function(models) {
        Post.belongsTo(models.Album);
        Post.belongsTo(models.User);
        Post.hasMany(models.Comment);
        Post.belongsToMany(models.User, { through: 'Follow', foreignKey: 'userId' })
        Post.belongsToMany(models.User, { through: 'Like', foreignKey: 'postId' })
      }
    }
  });
  return Post;
};
