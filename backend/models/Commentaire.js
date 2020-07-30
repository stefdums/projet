'use strict';

module.exports = (sequelize, DataTypes) => {
  const Commentaire = sequelize.define('Commentaire', {

    texte: DataTypes.STRING,
    imageComm: {
      type: DataTypes.STRING,
      allowNull: true
    },  
    UserId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    MessageId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Messages',
        key: 'id'
      }
    },

  }, {});
  Commentaire.associate = function(models) {
    // associations can be defined here
    Commentaire.belongsTo(models.Message, {
      as: 'message',
      foreignKey: 'MessageId',

    }),
    Commentaire.belongsTo(models.User, {

      foreignKey: {
        allowNull: false
      }
    })
  }
  return Commentaire;

}
