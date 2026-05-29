'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Post, { foreignKey: 'postId', as : 'images'});
    }
  }
  PostImage.init({
    url: { type: DataTypes.STRING, allowNull: false }
  }, {
    sequelize,
    modelName: 'PostImage',
  });
  return PostImage;
};