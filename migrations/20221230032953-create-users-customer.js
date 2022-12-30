'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users_customers', {
      customer_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true,
      },
      pw: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      point: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue:10000,
      },
      created_At: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users_customers');
  }
};