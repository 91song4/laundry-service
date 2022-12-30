'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('request_statuses', {
      request_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'service_requests',
          key: 'request_id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      provider_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: null,
        references: {
          model: 'users_providers',
          key: 'provider_id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      current_status: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0,
      },
      updated_At: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('request_statuses');
  }
};