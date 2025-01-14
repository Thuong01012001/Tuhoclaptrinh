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
      // Định nghĩa liên kết với model Doctor
     
    }
  }

  Doctor_Clinic_Specialty.init(
    {
      doctorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      clinicId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      specialtyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'Doctor_Clinic_Specialty',
      tableName: 'doctor_clinic_specialty',
      timestamps: true,
    }
  );

  return Doctor_Clinic_Specialty;
};
