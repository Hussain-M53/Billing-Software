'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      'ALTER TABLE Billing DROP CONSTRAINT DF_Billing_TransUID'
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Billing', 'TransUID', {
      type: Sequelize.INTEGER,
      defaultValue: null, // Adjust the default value as per your requirements
      allowNull: true,
    });
  },
};
