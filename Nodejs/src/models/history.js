'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index.js` file will call this method automatically.
     */
    static associate(models) {
      // Define associations here
      // Example: this.belongsTo(models.User, { foreignKey: 'patientId' });
      // Example: this.belongsTo(models.Doctor, { foreignKey: 'doctorId' });
    }
  }

  History.init(
    {
      patientId: DataTypes.INTEGER,
      doctorId: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      files: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'History',
    }
  );

  return History;
};
