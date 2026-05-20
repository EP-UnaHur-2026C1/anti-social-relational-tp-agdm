'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Post, { foreignKey: 'userNickname', sourceKey: 'nickName', as: 'posts' });
      this.hasMany(models.Comment, { foreignKey: 'userNickname', sourceKey: 'nickName', as: 'comments' });
      this.belongsToMany(models.User, { as: 'Followers', through: 'UserFollowers', foreignKey: 'followingId' });
      this.belongsToMany(models.User, { as: 'Following', through: 'UserFollowers', foreignKey: 'followerId' });
    }
  }
  User.init({
    nickName: { type: DataTypes.STRING, primaryKey: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};