'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Billing', 'TransUID', {
      type: Sequelize.INTEGER,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Billing', 'TransUID', {
      type: Sequelize.BIGINT,
    });
  },
};
