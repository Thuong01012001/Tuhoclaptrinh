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
      // Liên kết với bảng Doctor (nếu có bảng này)
    
    }
  }

  Clinic.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,  // Kiểm tra không để trống
        validate: {
          notEmpty: true,  // Kiểm tra không để trống
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Clinic',
      tableName: 'clinics',  // Đảm bảo tên bảng trong model giống với migration
      timestamps: true,  // Tự động thêm createdAt và updatedAt
    }
  );

  return Clinic;
};
