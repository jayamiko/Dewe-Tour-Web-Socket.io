'use strict';
module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define('Chat', {
    message: DataTypes.TEXT,
    idSender: DataTypes.INTEGER,
    idRecipient: DataTypes.INTEGER
  }, {});
  Chat.associate = function(models) {
    // associations can be defined here
  };
  return Chat;
};