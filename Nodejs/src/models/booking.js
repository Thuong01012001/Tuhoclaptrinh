'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index.js` file will call this method automatically.
     */
    static associate(models) {
      // Define associations here
      // Example: this.belongsTo(models.Doctor, { foreignKey: 'doctorId' });
      // Example: this.belongsTo(models.Patient, { foreignKey: 'patientId' });
    }
  }

  Booking.init(
    {
      statusId: DataTypes.STRING,
      doctorId: DataTypes.INTEGER,
      patientId: DataTypes.INTEGER,
      date: DataTypes.DATE,
      timeType: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Booking',
    }
  );

  return Booking;
};
