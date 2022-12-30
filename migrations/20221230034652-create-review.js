'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reviews', {
      review_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      customer_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'users_customers',
          key: 'customer_id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      provider_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'users_providers',
          key: 'provider_id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      star: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      review: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      photo: {
        type: Sequelize.BLOB,
        allowNull: false,
      },
      created_At: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),

      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('reviews');
  }
};