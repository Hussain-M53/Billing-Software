'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    let tableName = 'Billing_Details';
    let columnName1 = 'RowNo';
 
    const query = `ALTER TABLE "${tableName}" ADD CONSTRAINT custom_primary_RowNo  PRIMARY KEY ("${columnName1}"); `;
    await queryInterface.sequelize.query(query);

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    let tableName = 'Billing_Details';
    let constraintName = 'custom_primary_RowNo';

    return Promise.all([
          queryInterface.removeConstraint(tableName, constraintName),
    ]);

  }
};
