'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Doctor_Clinic_Specialty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index.js` file will call this method automatically.
     */
    static associate(models) {
      // Define associations here
      // Example: this.belongsTo(models.Doctor, { foreignKey: 'doctorId' });
      // Example: this.belongsTo(models.Patient, { foreignKey: 'patientId' });
      // Example: this.belongsTo(models.Specialty, { foreignKey: 'specialtyId' });
    }
  }

  Doctor_Clinic_Specialty.init(
    {
      doctorId: DataTypes.INTEGER,
      patientId: DataTypes.INTEGER,
      specialtyId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Doctor_Clinic_Specialty',
    }
  );

  return Doctor_Clinic_Specialty;
};
