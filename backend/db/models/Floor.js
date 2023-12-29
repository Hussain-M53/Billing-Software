'use strict';

module.exports = (sequelize, DataTypes, Model) => {
    class Floor extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Floor.hasMany(models.Space, {
                foreignKey: 'floor_id',
                as: 'space'
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