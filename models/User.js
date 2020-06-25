'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },  
    password: DataTypes.STRING,
    isAdmin: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }  
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    models.User.hasMany(models.Message),

    models.User.hasMany(models.Commentaire, {
      as: 'commentaires',
      foreignKey: 'UserId'
    })
  };
  return User;
};