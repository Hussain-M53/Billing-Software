'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        let groups = ['UnitAdjustment'];
        let permissions = ['View', 'Create', 'Update', 'Delete', 'Print'];
        let data = [];
        for (let i = 0; i < groups.length; i++) {
            let group = groups[i];
            for (let j = 0; j < permissions.length; j++) {
                let permission = permissions[j];
                let item = {
                    name: `${permission} ${group}`,
                    uq_key: `${permission.toLowerCase()}_${group.toLowerCase().replaceAll(' ', '_')}`,
                    group_name: group,
                    createdAt: new Date(),
                    updatedAt: new Date()
                };
                data.push(item);
            }
        }
        return queryInterface.bulkInsert('permissions', data);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('permissions', {
          group_name: 'UnitAdjustment',
        }
          , {});
    }
};
