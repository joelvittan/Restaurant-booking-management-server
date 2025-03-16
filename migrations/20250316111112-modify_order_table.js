'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('order', 'paymentMethod');
    await queryInterface.removeColumn('order', 'paymentStatus');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('order', 'paymentMethod', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn('order', 'paymentStatus', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  }
};

