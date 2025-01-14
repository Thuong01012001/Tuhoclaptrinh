import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class User extends Model {
    static associate(models) {
      // User.belongsTo(models.Allcode, {
      //   foreignKey: 'gender',
      //   targetKey: 'keyMap',
      //   as: 'genderData',
      // });
  
      // User.belongsTo(models.Allcode, {
      //   foreignKey: 'positionId',
      //   targetKey: 'keyMap',
      //   as: 'positionData',
      // });
      User.hasOne(models.Markdown, {foreignKey: 'doctorId'});
    }
  }

  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      positionId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image: {
        type: DataTypes.BLOB,
        allowNull: true,
      },
      roleId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
      timestamps: true,
    }
  );

  return User;
};
