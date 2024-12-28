'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('doctor_clinic_specialty', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      doctorId: {
        type: Sequelize.INTEGER,
      },
      patientId: {
        type: Sequelize.INTEGER,
      },
      specialtyId: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('doctor_clinic_specialty');
  },
};
