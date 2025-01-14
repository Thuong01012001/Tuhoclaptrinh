'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('schedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      currentNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,  // Kiểm tra không để trống
      },
      maxNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,  // Kiểm tra không để trống
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,  // Kiểm tra không để trống
      },
      timeType: {
        type: Sequelize.STRING,
        allowNull: false,  // Kiểm tra không để trống
      },
      doctorId: {
        type: Sequelize.STRING,
        allowNull: false,  // Kiểm tra không để trống
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
    await queryInterface.dropTable('schedules');
  },
};
