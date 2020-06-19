'use strict';

module.exports = (sequelize, DataTypes) => {
  const Commentaire = sequelize.define('Commentaire', {
    texte: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      // references: {
      //   model: 'User',
      //   key: 'id'
      // }
    },
    messageId:{
      type: DataTypes.INTEGER,
      // references: {
      //   model: 'Message',
      //   key: 'id'
      // }
    },
  }, {});
  Commentaire.associate = function(models) {
    // associations can be defined here
    // models.User.belongsToMany(models.Message, {
    //   through: models.Commentaire,
    //   foreignKey: 'UserId',
    //   otherKey: 'messageId',  
    // });

    // models.Message.belongsToMany(models.User, {
    //   through: models.Commentaire,
    //   foreignKey: 'messageId',
    //   otherKey: 'UserId',  
    // });

    // models.Commentaire.belongsTo(models.User, {
    //   foreignKey: 'UserId',
    //   as: 'user',
    // });

    // models.Commentaire.belongsTo(models.Message, {
    //   foreignKey: 'messageId',
    //   as: 'message',
    // });
  };
  return Commentaire;
};
