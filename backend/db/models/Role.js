'use strict';

module.exports = (sequelize, DataTypes, Model) => {
    class Role extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Role.hasMany(models.User, {
                foreignKey: 'role_id',
                as: 'users',
            });
        }
    }

    Role.init({
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            key: DataTypes.STRING,
            created_by: DataTypes.INTEGER,
            updated_by: DataTypes.INTEGER,
            permissions: {
                type: DataTypes.TEXT,
                get() {
                    const rawValue = this.getDataValue('permissions');
                    return (typeof rawValue) == 'string' ? JSON.parse(rawValue) : rawValue;
                }
            }
        },
        {
            sequelize,
            tableName: 'roles',
            modelName: 'Role',
        });
    return Role;
};