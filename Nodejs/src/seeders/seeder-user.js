import { Sequelize } from 'sequelize';

export const up = async (queryInterface, Sequelize) => {
  return queryInterface.bulkInsert('Users', [
    {
      email: 'admin@gmail.com',
      password: '123456789',
      firstName: 'Ba',
      lastName: 'Thuong',
      address: 'VietNam',
      gender: 1,
      typeRole: 'ROLE',
      keyRole: 'R1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
};

export const down = async (queryInterface, Sequelize) => {
  return queryInterface.bulkDelete('Users', null, {});
};
