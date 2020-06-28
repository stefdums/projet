'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    titreImage: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    nbCommentaires: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  }, {});
  Message.associate = function(models) {
    // associations can be defined here
    models.Message.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'UserId',
      allowNull: false,
      
      //onDelete: 'CASCADE'
    }),
    models.Message.hasMany(models.Commentaire, {
      as: 'commentaires',
      foreignKey: 'MessageId',
      onDelete: 'CASCADE'
    }) 
  };
  return Message;
};