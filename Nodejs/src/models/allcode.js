import { DataTypes, Model } from 'sequelize';

export default (sequelize) => {
  class Allcode extends Model {
    static associate(models) {
      // Allcode.hasMany(models.User, {
      //   foreignKey: 'gender',
      //   as: 'genderData', // Alias khi dùng include
      // });
  
      // Allcode.hasMany(models.User, {
      //   foreignKey: 'positionId',
      //   as: 'positionData',
      // });
    }
  }

  Allcode.init(
    {
      keyMap: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      valueEn: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      valueVi: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Allcode',
      tableName: 'allcodes',
      timestamps: true,
    }
  );

  return Allcode;
};
