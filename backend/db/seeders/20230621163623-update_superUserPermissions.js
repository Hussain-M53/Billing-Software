'use strict';
const Permission = require('../models').Permission;
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/config.js')[env];

module.exports = {
    async up(queryInterface, Sequelize) {

        let sequelize;

        if (config.use_env_variable) {
            sequelize = new Sequelize(process.env[config.use_env_variable], config);
        } else {
            sequelize = new Sequelize(config.database, config.username, config.password, config);
        }

        let perms = await Permission.findAll();
        let data = [];
        perms.forEach((permission, index) => {
            let item = {
                is_assigned: true,
                uq_key: permission.uq_key,
                name: permission.name,
                group_name: permission.group_name
            }
            data.push(item);
        })
        
        await queryInterface.bulkUpdate(
          'roles', // Name of the table
          { permissions: JSON.stringify(data) }, // Values to be updated
          { key: '@super_user' } // Condition to match the record(s) to be updated
        );
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        //await queryInterface.bulkDelete('roles', null, {});
    }
};
