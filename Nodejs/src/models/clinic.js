'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Clinic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index.js` file will call this method automatically.
     */
    static associate(models) {
      // Define associations here
      // Example: this.hasMany(models.Doctor, { foreignKey: 'clinicId' });
    }
  }

  Clinic.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      description: DataTypes.TEXT,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Clinic',
    }
  );

  return Clinic;
};
