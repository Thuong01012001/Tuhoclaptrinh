'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index.js` file will call this method automatically.
     */
    static associate(models) {
      // Define associations here
      // Example: this.belongsTo(models.Doctor, { foreignKey: 'doctorId' });
    }
  }

  Schedule.init(
    {
      currentNumber: DataTypes.INTEGER,
      maxNumber: DataTypes.INTEGER,
      date: DataTypes.DATE,
      timeType: DataTypes.STRING, // Fixed typo: STRNG -> STRING
      doctorId: DataTypes.STRING, // Fixed typo: dotorId -> doctorId
    },
    {
      sequelize,
      modelName: 'Schedule',
    }
  );

  return Schedule;
};
