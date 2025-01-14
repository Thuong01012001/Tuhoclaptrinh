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
     
      
    }
  }

  History.init(
    {
      patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,  // Kiểm tra không để trống
      },
      doctorId: {
        type: DataTypes.INTEGER,
        allowNull: false,  // Kiểm tra không để trống
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,  // Không bắt buộc
      },
      files: {
        type: DataTypes.TEXT,
        allowNull: true,  // Không bắt buộc
      },
    },
    {
      sequelize,
      modelName: 'History',
      tableName: 'histories',  // Đảm bảo tên bảng trong model giống với migration
      timestamps: true,  // Tự động thêm createdAt và updatedAt
    }
  );

  return History;
};
