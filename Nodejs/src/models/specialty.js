'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Specialty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index.js` file will call this method automatically.
     */
    static associate(models) {
      // Ví dụ: mỗi specialty có nhiều bác sĩ, ta có thể thêm mối quan hệ này
      // this.hasMany(models.Doctor, { foreignKey: 'specialtyId' });
    }
  }

  Specialty.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,  // Đảm bảo specialty luôn có tên
      },
      image: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'Specialty',
      tableName: 'specialties', // Đảm bảo tên bảng trong model trùng với migration
      timestamps: true,  // Sử dụng createdAt và updatedAt
    }
  );

  return Specialty;
};
