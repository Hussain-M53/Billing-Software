'use strict';

module.exports = (sequelize, DataTypes, Model) => {
    class Company extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Company.hasMany(models.Customer, {
                foreignKey: 'CoID',
                as: 'customers',
            });
            Company.hasMany(models.Floor, {
                foreignKey: 'CoID',
                as: 'floors',
            });
            Company.hasMany(models.Meter, {
                foreignKey: 'CoID',
                as: 'meters',
            });
            Company.hasMany(models.Meter, { //added by hussain
                foreignKey: 'CoID',
                as: 'shops',
            });

        }
    }

    Company.init({
            CoID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                //autoIncrement: true,
            },
            Name: {type: DataTypes.STRING, allowNull: false},
			Add1: {type:DataTypes.STRING, defaultValue: ""}, 
			Add2: {type:DataTypes.STRING, defaultValue: ""}, 
			Add3: {type:DataTypes.STRING, defaultValue: ""}, 
			Contact: {type:DataTypes.STRING, defaultValue: ""}, 
			ContactPerson: {type:DataTypes.STRING, defaultValue: ""}, 
			Fax: {type:DataTypes.STRING, defaultValue: ""}, 
			GST: {type:DataTypes.STRING, defaultValue: ""}, 
			NTN: {type:DataTypes.STRING, defaultValue: ""}, 
			NIC: {type:DataTypes.STRING, defaultValue: ""}, 
			Nature: {type:DataTypes.STRING, defaultValue: ""}, 
			Description: {type:DataTypes.STRING, defaultValue: ""}, 
			Email: {type:DataTypes.STRING, defaultValue: ""}, 
			Website: {type:DataTypes.STRING, defaultValue: ""}, 
			LogoPath: {type:DataTypes.STRING, defaultValue: ""}, 
			SignPath: {type:DataTypes.STRING, defaultValue: ""}, 
			Watermark: {type:DataTypes.STRING, defaultValue: ""}, 
			TImgName: {type:DataTypes.STRING, defaultValue: ""}, 
			Disclaimer: {type:DataTypes.STRING, defaultValue: ""}, 
			Def: {type:DataTypes.BOOLEAN, defaultValue: false},
			LLDate: {type:DataTypes.DATE, defaultValue: new Date("1981-03-08")}, 
			isSTax: {type:DataTypes.BOOLEAN, defaultValue: false},
			AttachPath_DC: {type:DataTypes.STRING, defaultValue: ""}, 
			NameLocal: {type:DataTypes.STRING, defaultValue: ""}, 
            SPFactor: {type:DataTypes.DECIMAL(18,4), defaultValue: 0},
			TimeIn: {type:DataTypes.DATE, defaultValue: DataTypes.NOW}, 
			TimeOut: {type:DataTypes.DATE, defaultValue: DataTypes.NOW}, 
            OverTimeFactor: {type:DataTypes.DECIMAL(18,2), defaultValue: 0},
            LateFactor: {type:DataTypes.DECIMAL(18,2), defaultValue: 0},
            POCFactor: {type:DataTypes.DECIMAL(18,2), defaultValue: 0},
            PHFactor: {type:DataTypes.DECIMAL(18,2), defaultValue: 0},
            DaysPerMonth: {type:DataTypes.DECIMAL(18,0), defaultValue: 0},
            HoursPerDay: {type:DataTypes.DECIMAL(18,0), defaultValue: 0},
            LeavesPerMonth: {type:DataTypes.DECIMAL(18,0), defaultValue: 0},
            UnitRate_Lesco: {type:DataTypes.DECIMAL(18,2), defaultValue: 0},
            UnitRate_Genset: {type:DataTypes.DECIMAL(18,2), defaultValue: 0},
            MeterRentLesco: {type:DataTypes.DECIMAL(18,0), defaultValue: 0},
            FixedChargesGenset: {type:DataTypes.DECIMAL(18,0), defaultValue: 0},
            NoOfTenants: {type:DataTypes.INTEGER, defaultValue: 0},
            ServiceChargesPerSqft: {type:DataTypes.DECIMAL(18,2), defaultValue: 0},
            WaterChargesMonthly: {type:DataTypes.DECIMAL(18,0), defaultValue: 0},
            STaxPerPunjab: {type:DataTypes.DECIMAL(18,2), defaultValue: 0},
			isAfterDueDatePercent: {type:DataTypes.BOOLEAN, defaultValue: false},
            AfterDueDatePenaltyAmount: {type:DataTypes.DECIMAL(18,0), defaultValue: 0},
            AfterDueDatePenaltyPercent: {type:DataTypes.DECIMAL(18,2), defaultValue: 0},
            ExhaustFanTableId_Lesco: {type:DataTypes.BIGINT, defaultValue: 0},
            ExhaustFanTableId_Genset: {type:DataTypes.BIGINT, defaultValue: 0},
			AccountTitle: {type:DataTypes.STRING, defaultValue: ""}, 
			AccountNo: {type:DataTypes.STRING, defaultValue: ""}, 
			BankName: {type:DataTypes.STRING, defaultValue: ""}, 
			DisableExhaustFan: {type:DataTypes.BOOLEAN, defaultValue: false},
			DisableWater: {type:DataTypes.BOOLEAN, defaultValue: false},
			DisableServiceCharges: {type:DataTypes.BOOLEAN, defaultValue: false},
            RatePerTonHour: {type:DataTypes.DECIMAL(18,2), defaultValue: 0},

        },

        {
            sequelize,
            tableName: 'Profile',
            modelName: 'Company',
            timestamps: false
        });
    return Company;
};