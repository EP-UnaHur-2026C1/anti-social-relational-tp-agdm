'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Comments', 'userNickname', {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'nickName'
      }
    });
    await queryInterface.addColumn('Comments', 'postId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Posts',
        key: 'id'
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Comments', 'userNickname');
    await queryInterface.removeColumn('Comments', 'postId');
  }
};