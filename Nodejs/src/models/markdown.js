'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Markdown extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index.js` file will call this method automatically.
     */
    static associate(models) {
      // Liên kết với bảng Doctor (nếu có bảng này)
      Markdown.belongsTo(models.User, {foreignKey: 'doctorId'})
    
    }
  }

  Markdown.init(
    {
      contentHTML: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
      },
      contentMarkdown: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
      },
      doctorId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT('long'),
        allowNull: true,
      },
      specialtyId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      clinicId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Markdown',
      tableName: 'markdowns',  // Đảm bảo tên bảng trong model giống với migration
      timestamps: true,  // Tự động thêm createdAt và updatedAt
    }
  );

  return Markdown;
};
