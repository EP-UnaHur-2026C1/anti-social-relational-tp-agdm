'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userNickname', targetKey: 'nickName', as: 'author' });
      this.belongsTo(models.Post, { foreignKey: 'postId', as: 'post' });
    }
  }
  Comment.init({
    contenido: { type: DataTypes.TEXT, allowNull: false },
    visible: { type: DataTypes.BOOLEAN, defaultValue: true },
    userNickname: { type: DataTypes.STRING, allowNull: false }, 
    postId: { type: DataTypes.INTEGER, allowNull: false } 
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};