'use strict';
const bcrypt = require('bcryptjs');
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert('users_web', [{
            name: 'Super Admin',
            type: 'super_user#',
            username: 'superadmin',
            email: 'superadmin@lucky-it-solutions.com',
            role_id: 1,
            password: await bcrypt.hash('@123456@', 10),
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
        await queryInterface.bulkDelete('users_web', null, {});
    }
};
