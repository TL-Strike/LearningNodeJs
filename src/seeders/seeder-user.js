'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'admin@gmail.com',
        password: '123456',
        firstName: 'TL',
        lastName: 'Strike',
        address: 'VN',
        phonenumber: '0123456789',
        gender: '1',
        image: 'https://i.pinimg.com/originals/2c/4b/0f/2c4b0f3a1d5e7a8d6e9f8b5a1e7c3d3b.jpg',
        roleId: 'R1',
        positionId:"Doctor",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
