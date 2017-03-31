'use strict';
module.exports = function(sequelize, DataTypes) {
  var Album = sequelize.define('Album', {
    name: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
    }, {
      classMethods: {
        associate: function(models) {
          Album.belongsTo(models.User);
          Album.hasMany(models.Post);
        }
      }
    });
    return Album;
};
