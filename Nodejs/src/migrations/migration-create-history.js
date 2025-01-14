'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('histories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      patientId: {
        type: Sequelize.INTEGER,
        allowNull: false,  // Kiểm tra không để trống
      },
      doctorId: {
        type: Sequelize.INTEGER,
        allowNull: false,  // Kiểm tra không để trống
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,  // Không bắt buộc
      },
      files: {
        type: Sequelize.TEXT,
        allowNull: true,  // Không bắt buộc
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('histories');
  },
};
