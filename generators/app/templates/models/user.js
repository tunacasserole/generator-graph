'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },


    
  }, {});

  // User.associate = function (models) {

  //   models.User.hasMany(models.Role, {
  //     foreignKey: "UserId",
  //     sourceKey: "id"
  //   })
  // }
  
  return User;
};