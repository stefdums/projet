'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    titreImage: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {});
  Message.associate = function(models) {
    // associations can be defined here
    models.Message.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    })
    
  };
  return Message;
};