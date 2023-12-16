'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Billing_Details', 'CID', {
      type: Sequelize.BIGINT,
      allowNull: true,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Billing_Details', 'CID', {
      type: Sequelize.BIGINT,
      allowNull: false,
    });
  },
};
