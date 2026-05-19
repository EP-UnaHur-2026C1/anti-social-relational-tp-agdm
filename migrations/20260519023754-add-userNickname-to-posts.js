'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Posts', 'userNickname', {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'nickName'
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Posts', 'userNickname');
  }
};