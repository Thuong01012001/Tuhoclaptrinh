'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Specialty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Specialty.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      description: DataTypes.TEXT, 
    },
    {
      sequelize,
      modelName: 'Specialty',
    }
  );

  return Specialty;
};
