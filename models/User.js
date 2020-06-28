'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    photoProfil: {
      type: DataTypes.STRING,
      defaultValue:  `user_profil_default.png`
    },
    password: DataTypes.STRING,
    isAdmin: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }  
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    models.User.hasMany(models.Message , {
      as: 'messages',
      foreignKey: 'UserId',
      onDelete: 'CASCADE'
    }),

    models.User.hasMany(models.Commentaire, {
      as: 'commentaires',
      foreignKey: 'UserId',
      onDelete: 'CASCADE'
    })
  };
  return User;
};