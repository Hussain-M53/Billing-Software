'use strict';

module.exports = (sequelize, DataTypes, Model) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            User.belongsTo(models.Role, {
                foreignKey: 'role_id',
                as: 'role',
            });
        }
    }

    User.init({
            username: DataTypes.STRING,
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            type: DataTypes.STRING,
            password: DataTypes.STRING,
            token: DataTypes.TEXT,
            created_by: DataTypes.INTEGER,
            updated_by: DataTypes.INTEGER,
        },
        {
            sequelize,
            tableName: 'users_web',
            modelName: 'User',
        });
    return User;
};