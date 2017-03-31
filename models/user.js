'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    userName: {
      type:  DataTypes.STRING
    },
    firstName: {
      type:  DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    email: DataTypes.STRING,
    profile: DataTypes.TEXT,
    password: DataTypes.STRING,
    resetPasswordToken: DataTypes.STRING,
    resetPasswordExpires: DataTypes.DATE,
    isAdmin: {
      type: DataTypes.BOOLEAN
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Album);
        User.hasMany(models.Post);
        User.hasMany(models.Comment);
        User.belongsToMany(models.Post, { through: 'Follow'})
        User.belongsToMany(models.Post, { through: 'Like'})
      }
    }
  });
  return User;
};
