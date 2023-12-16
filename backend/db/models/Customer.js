'use strict';

module.exports = (sequelize, DataTypes, Model) => {
    class Customer extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Customer.belongsTo(models.Company, {
                foreignKey: {
					name:'CoID',
					//DataTypes.INTEGER,
					//defaultValue: 1,
					allowNull: false
				},
                as: 'company',
            });
            // Customer.hasMany(models.Customer, {
            //     foreignKey: 'SpID',
            //     as: 'space',
            // });
            Customer.belongsTo(models.Meter, {
                foreignKey: {
					name:'MeterId',
					//type: DataTypes.BIGINT,
					allowNull: false
				},
                as: 'meter',
            });

        }
    }

    Customer.init({
            CId: {
                type: DataTypes.BIGINT,
				autoIncrement: true,
                primaryKey: true,
            },
            CName: {type:DataTypes.STRING, allowNull: false, defaultValue: ""}, 
            Code: {type:DataTypes.STRING, allowNull: false, defaultValue: ""}, 
			Add1: {type:DataTypes.STRING, defaultValue: ""}, 
			Add2: {type:DataTypes.STRING, defaultValue: ""}, 
			Add3: {type:DataTypes.STRING, defaultValue: ""}, 
			ContactPerson: {type:DataTypes.STRING, defaultValue: ""}, 
			Fax: {type:DataTypes.STRING, defaultValue: ""}, 
			SalesTaxNo: {type:DataTypes.STRING, defaultValue: ""}, 
            TelNo: {type:DataTypes.STRING, defaultValue: ""}, 
            Email: {type:DataTypes.STRING, defaultValue: ""}, 
            Website: {type:DataTypes.STRING, defaultValue: ""}, 
            MobNo: {type:DataTypes.STRING, defaultValue: ""}, 
            Notes: {type:DataTypes.STRING, defaultValue: ""}, 
            NTN: {type:DataTypes.STRING, defaultValue: ""}, 
            CNIC: {type:DataTypes.STRING, defaultValue: ""}, 
            Disabled: {type:DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
            // CoID: {type:DataTypes.INTEGER, defaultValue: 1},
            claimedPer: {type:DataTypes.DECIMAL(10,3), allowNull: false, defaultValue: 100},
            status: {type:DataTypes.BOOLEAN, allowNull: false, defaultValue: true},
            enable_date: {type:DataTypes.DATEONLY, allowNull: false}, 
            disable_date: {type:DataTypes.DATEONLY}, 
},

        {
            sequelize,
            tableName: 'Customer_web',
            modelName: 'Customer',
            timestamps: false,
        });
    return Customer;
};