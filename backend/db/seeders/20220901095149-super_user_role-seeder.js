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
        
        let name = 'Super User';
        await queryInterface.bulkInsert('roles', [{
            name: 'Super User',
            // key: '@' + name.replace(' ', '_').toLowerCase(),
            key: '@super_user',
            description: 'Its a super user role',
            permissions: JSON.stringify(data),
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('roles', null, {});
    }
};
