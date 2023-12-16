'use strict';

module.exports = (sequelize, DataTypes, Model) => {
    class Floor extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Floor.hasMany(models.Meter, {
                foreignKey: 'floor_id',
                as: 'meters'
            });
            Floor.belongsTo(models.Company, {
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

    Floor.init({
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            created_by: DataTypes.INTEGER,
            updated_by: DataTypes.INTEGER,
        },
        {
            sequelize,
            tableName: 'floors_web',
            modelName: 'Floor',
        });
    return Floor;
};