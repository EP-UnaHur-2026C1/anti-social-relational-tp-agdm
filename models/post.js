'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userNickname', targetKey: 'nickName', as: 'author' });
      this.hasMany(models.Comment, { foreignKey: 'postId', as: 'comments' });
      this.belongsToMany(models.Tag, { through: 'PostTags', foreignKey: 'postId', otherKey: 'tagId' });
      this.hasMany(models.PostImage, { foreignKey: 'postId', as: 'images' });
    }
  }
  Post.init({
    description: { type: DataTypes.TEXT, allowNull: false }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};