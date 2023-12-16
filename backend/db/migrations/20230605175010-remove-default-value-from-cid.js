'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      'ALTER TABLE Billing_Details DROP CONSTRAINT DF_Billing_Details_CID'
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Billing_Details', 'CID', {
      type: Sequelize.INTEGER,
      defaultValue: 0, // Adjust the default value as per your requirements
      allowNull: false,
    });
  },
};
