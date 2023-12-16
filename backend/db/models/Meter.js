'use strict';

module.exports = (sequelize, DataTypes, Model) => {
    class Meter extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Meter.belongsTo(models.Floor, {
                foreignKey: 'floor_id',
                as: 'floor',
            });
            // Meter.belongsTo(models.HistoryTable, {
            //     foreignKey: 'HistoryTableId',
            //     as: 'historyTable',
            //     allowNull: false
            // });
            Meter.belongsTo(models.HistoryConfig, {
                foreignKey: 'history_config_id',
                as: 'historyConfig',
                allowNull: false
            });
            Meter.hasMany(models.Customer, {
                //foreignKey: 'CID', // dont give foreignKey in hasMany relation
                as: 'customers'
            });
            Meter.hasMany(models.UnitAdjustment, {
                //foreignKey: 'MeterId', // dont give foreignKey in hasMany relation
                as: 'unitAdjustments'
            });
            Meter.belongsTo(models.Company, {
                foreignKey: {
					name:'CoID',
					//DataTypes.INTEGER,
					//defaultValue: 1,
					allowNull: false
				},
                as: 'company',
            });

        }
    }

    Meter.init({
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            status: DataTypes.BOOLEAN,
            peakHourCalculation: {type:DataTypes.BOOLEAN, defaultValue: false},
 //           floor_id: DataTypes.INTEGER,
//            HistoryTableId: DataTypes.INTEGER,
            history_config_id: DataTypes.INTEGER,
            created_by: DataTypes.INTEGER,
            updated_by: DataTypes.INTEGER,
        },
        {
            sequelize,
            tableName: 'meters',
            modelName: 'Meter',
        });
    return Meter;
};