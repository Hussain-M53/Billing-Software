'use strict';

module.exports = (sequelize, DataTypes, Model) => {
    class ActivityLog extends Model {

        static associate(models) {

            ActivityLog.belongsTo(models.User, {
                foreignKey: {
                    name: 'UserID',
                    allowNull: false
                },
                as: 'users',
            });

        }
    }

    ActivityLog.init({
        LogID: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        OperationType: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
        Description: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
    },

        {
            sequelize,
            tableName: 'ActivityLog',
            modelName: 'ActivityLog',
            timestamps: false,
        });
    return ActivityLog;
};