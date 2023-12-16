'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Billing', 'FK_Billing_Users');
  },

  down: async (queryInterface, Sequelize) => {
    // Recreate the foreign key constraint
    await queryInterface.addConstraint('Billing', {
      fields: ['TransUID'],
      type: 'foreign key',
      name: 'FK_Billing_Users',
      references: {
        table: 'users_web',
        field: 'id',
      },
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE',
    });
  },
};
