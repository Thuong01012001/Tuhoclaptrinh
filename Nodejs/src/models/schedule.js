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
    
    }
  }

  Schedule.init(
    {
      currentNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,  // Kiểm tra không để trống
      },
      maxNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,  // Kiểm tra không để trống
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,  // Kiểm tra không để trống
      },
      timeType: {
        type: DataTypes.STRING,
        allowNull: false,  // Kiểm tra không để trống
      },
      doctorId: {
        type: DataTypes.STRING,
        allowNull: false,  // Kiểm tra không để trống
      },
    },
    {
      sequelize,
      modelName: 'Schedule',
      tableName: 'schedules',  // Đảm bảo tên bảng trong model giống với migration
      timestamps: true,  // Tự động thêm createdAt và updatedAt
    }
  );

  return Schedule;
};
