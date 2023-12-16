const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "Profile", deps: []
 * createTable() => "history_config", deps: []
 * createTable() => "historytable", deps: []
 * createTable() => "permissions", deps: []
 * createTable() => "roles", deps: []
 * createTable() => "users_web", deps: [roles]
 * createTable() => "floors_web", deps: [Profile]
 * createTable() => "meters", deps: [history_config, Profile, floors_web]
 * createTable() => "Customer_web", deps: [Profile, meters]
 * createTable() => "Billing", deps: [users_web, Profile]
 * createTable() => "Billing_Details", deps: [Billing, Customer_web]
 *
 */

const info = {
  revision: 1,
  name: "first-migration",
  created: "2023-05-31T08:31:36.440Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "Profile",
      {
        CoID: { type: Sequelize.INTEGER, field: "CoID", primaryKey: true },
        Name: { type: Sequelize.STRING, field: "Name", allowNull: false },
        Add1: { type: Sequelize.STRING, field: "Add1", defaultValue: "" },
        Add2: { type: Sequelize.STRING, field: "Add2", defaultValue: "" },
        Add3: { type: Sequelize.STRING, field: "Add3", defaultValue: "" },
        Contact: { type: Sequelize.STRING, field: "Contact", defaultValue: "" },
        ContactPerson: {
          type: Sequelize.STRING,
          field: "ContactPerson",
          defaultValue: "",
        },
        Fax: { type: Sequelize.STRING, field: "Fax", defaultValue: "" },
        GST: { type: Sequelize.STRING, field: "GST", defaultValue: "" },
        NTN: { type: Sequelize.STRING, field: "NTN", defaultValue: "" },
        NIC: { type: Sequelize.STRING, field: "NIC", defaultValue: "" },
        Nature: { type: Sequelize.STRING, field: "Nature", defaultValue: "" },
        Description: {
          type: Sequelize.STRING,
          field: "Description",
          defaultValue: "",
        },
        Email: { type: Sequelize.STRING, field: "Email", defaultValue: "" },
        Website: { type: Sequelize.STRING, field: "Website", defaultValue: "" },
        LogoPath: {
          type: Sequelize.STRING,
          field: "LogoPath",
          defaultValue: "",
        },
        SignPath: {
          type: Sequelize.STRING,
          field: "SignPath",
          defaultValue: "",
        },
        Watermark: {
          type: Sequelize.STRING,
          field: "Watermark",
          defaultValue: "",
        },
        TImgName: {
          type: Sequelize.STRING,
          field: "TImgName",
          defaultValue: "",
        },
        Disclaimer: {
          type: Sequelize.STRING,
          field: "Disclaimer",
          defaultValue: "",
        },
        Def: { type: Sequelize.BOOLEAN, field: "Def", defaultValue: false },
        LLDate: {
          type: Sequelize.DATE,
          field: "LLDate",
          defaultValue: Sequelize.Date,
        },
        isSTax: {
          type: Sequelize.BOOLEAN,
          field: "isSTax",
          defaultValue: false,
        },
        AttachPath_DC: {
          type: Sequelize.STRING,
          field: "AttachPath_DC",
          defaultValue: "",
        },
        NameLocal: {
          type: Sequelize.STRING,
          field: "NameLocal",
          defaultValue: "",
        },
        SPFactor: {
          type: Sequelize.DECIMAL(18, 4),
          field: "SPFactor",
          defaultValue: 0,
        },
        TimeIn: {
          type: Sequelize.DATE,
          field: "TimeIn",
          defaultValue: Sequelize.NOW,
        },
        TimeOut: {
          type: Sequelize.DATE,
          field: "TimeOut",
          defaultValue: Sequelize.NOW,
        },
        OverTimeFactor: {
          type: Sequelize.DECIMAL(18, 2),
          field: "OverTimeFactor",
          defaultValue: 0,
        },
        LateFactor: {
          type: Sequelize.DECIMAL(18, 2),
          field: "LateFactor",
          defaultValue: 0,
        },
        POCFactor: {
          type: Sequelize.DECIMAL(18, 2),
          field: "POCFactor",
          defaultValue: 0,
        },
        PHFactor: {
          type: Sequelize.DECIMAL(18, 2),
          field: "PHFactor",
          defaultValue: 0,
        },
        DaysPerMonth: {
          type: Sequelize.DECIMAL(18),
          field: "DaysPerMonth",
          defaultValue: 0,
        },
        HoursPerDay: {
          type: Sequelize.DECIMAL(18),
          field: "HoursPerDay",
          defaultValue: 0,
        },
        LeavesPerMonth: {
          type: Sequelize.DECIMAL(18),
          field: "LeavesPerMonth",
          defaultValue: 0,
        },
        UnitRate_Lesco: {
          type: Sequelize.DECIMAL(18, 2),
          field: "UnitRate_Lesco",
          defaultValue: 0,
        },
        UnitRate_Genset: {
          type: Sequelize.DECIMAL(18, 2),
          field: "UnitRate_Genset",
          defaultValue: 0,
        },
        MeterRentLesco: {
          type: Sequelize.DECIMAL(18),
          field: "MeterRentLesco",
          defaultValue: 0,
        },
        FixedChargesGenset: {
          type: Sequelize.DECIMAL(18),
          field: "FixedChargesGenset",
          defaultValue: 0,
        },
        NoOfTenants: {
          type: Sequelize.INTEGER,
          field: "NoOfTenants",
          defaultValue: 0,
        },
        ServiceChargesPerSqft: {
          type: Sequelize.DECIMAL(18, 2),
          field: "ServiceChargesPerSqft",
          defaultValue: 0,
        },
        WaterChargesMonthly: {
          type: Sequelize.DECIMAL(18),
          field: "WaterChargesMonthly",
          defaultValue: 0,
        },
        STaxPerPunjab: {
          type: Sequelize.DECIMAL(18, 2),
          field: "STaxPerPunjab",
          defaultValue: 0,
        },
        isAfterDueDatePercent: {
          type: Sequelize.BOOLEAN,
          field: "isAfterDueDatePercent",
          defaultValue: false,
        },
        AfterDueDatePenaltyAmount: {
          type: Sequelize.DECIMAL(18),
          field: "AfterDueDatePenaltyAmount",
          defaultValue: 0,
        },
        AfterDueDatePenaltyPercent: {
          type: Sequelize.DECIMAL(18, 2),
          field: "AfterDueDatePenaltyPercent",
          defaultValue: 0,
        },
        ExhaustFanTableId_Lesco: {
          type: Sequelize.BIGINT,
          field: "ExhaustFanTableId_Lesco",
          defaultValue: 0,
        },
        ExhaustFanTableId_Genset: {
          type: Sequelize.BIGINT,
          field: "ExhaustFanTableId_Genset",
          defaultValue: 0,
        },
        AccountTitle: {
          type: Sequelize.STRING,
          field: "AccountTitle",
          defaultValue: "",
        },
        AccountNo: {
          type: Sequelize.STRING,
          field: "AccountNo",
          defaultValue: "",
        },
        BankName: {
          type: Sequelize.STRING,
          field: "BankName",
          defaultValue: "",
        },
        DisableExhaustFan: {
          type: Sequelize.BOOLEAN,
          field: "DisableExhaustFan",
          defaultValue: false,
        },
        DisableWater: {
          type: Sequelize.BOOLEAN,
          field: "DisableWater",
          defaultValue: false,
        },
        DisableServiceCharges: {
          type: Sequelize.BOOLEAN,
          field: "DisableServiceCharges",
          defaultValue: false,
        },
        RatePerTonHour: {
          type: Sequelize.DECIMAL(18),
          field: "RatePerTonHour",
          defaultValue: 0,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "history_config",
      {
        ID: { type: Sequelize.INTEGER, field: "ID", primaryKey: true },
        ID_: { type: Sequelize.STRING, field: "ID_" },
        HISTORYNAME: { type: Sequelize.STRING, field: "HISTORYNAME" },
        SOURCE: { type: Sequelize.STRING, field: "SOURCE" },
        SOURCEHANDLE: { type: Sequelize.STRING, field: "SOURCEHANDLE" },
        TIMEZONE: { type: Sequelize.STRING, field: "TIMEZONE" },
        INTERVAL_: { type: Sequelize.STRING, field: "INTERVAL_" },
        VALUEFACETS: { type: Sequelize.STRING, field: "VALUEFACETS" },
        TABLE_NAME: { type: Sequelize.STRING, field: "TABLE_NAME" },
        DB_TIMEZONE: { type: Sequelize.STRING, field: "DB_TIMEZONE" },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "historytable",
      {
        HistoryTableId: {
          type: Sequelize.BIGINT,
          field: "HistoryTableId",
          primaryKey: true,
        },
        TableName: {
          type: Sequelize.STRING,
          field: "TableName",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "permissions",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: "name" },
        uq_key: { type: Sequelize.STRING, field: "uq_key" },
        group_name: { type: Sequelize.STRING, field: "group_name" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "roles",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: "name" },
        description: { type: Sequelize.STRING, field: "description" },
        key: { type: Sequelize.STRING, field: "key" },
        created_by: { type: Sequelize.INTEGER, field: "created_by" },
        updated_by: { type: Sequelize.INTEGER, field: "updated_by" },
        permissions: { type: Sequelize.TEXT, field: "permissions" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "users_web",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        username: { type: Sequelize.STRING, field: "username" },
        name: { type: Sequelize.STRING, field: "name" },
        email: { type: Sequelize.STRING, field: "email" },
        type: { type: Sequelize.STRING, field: "type" },
        password: { type: Sequelize.STRING, field: "password" },
        token: { type: Sequelize.TEXT, field: "token" },
        created_by: { type: Sequelize.INTEGER, field: "created_by" },
        updated_by: { type: Sequelize.INTEGER, field: "updated_by" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        role_id: {
          type: Sequelize.INTEGER,
          field: "role_id",
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "roles", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "floors_web",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: "name" },
        description: { type: Sequelize.STRING, field: "description" },
        created_by: { type: Sequelize.INTEGER, field: "created_by" },
        updated_by: { type: Sequelize.INTEGER, field: "updated_by" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        CoID: {
          type: Sequelize.INTEGER,
          name: "CoID",
          field: "CoID",
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "Profile", key: "CoID" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "meters",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: "name" },
        description: { type: Sequelize.STRING, field: "description" },
        status: { type: Sequelize.BOOLEAN, field: "status" },
        peakHourCalculation: {
          type: Sequelize.BOOLEAN,
          field: "peakHourCalculation",
          defaultValue: false,
        },
        history_config_id: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "history_config", key: "ID" },
          allowNull: true,
          field: "history_config_id",
        },
        created_by: { type: Sequelize.INTEGER, field: "created_by" },
        updated_by: { type: Sequelize.INTEGER, field: "updated_by" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        CoID: {
          type: Sequelize.INTEGER,
          name: "CoID",
          field: "CoID",
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "Profile", key: "CoID" },
          allowNull: true,
        },
        floor_id: {
          type: Sequelize.INTEGER,
          field: "floor_id",
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "floors_web", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Customer_web",
      {
        CId: {
          type: Sequelize.BIGINT,
          field: "CId",
          primaryKey: true,
          autoIncrement: true,
        },
        CName: {
          type: Sequelize.STRING,
          field: "CName",
          defaultValue: "",
          allowNull: false,
        },
        Code: {
          type: Sequelize.STRING,
          field: "Code",
          defaultValue: "",
          allowNull: false,
        },
        Add1: { type: Sequelize.STRING, field: "Add1", defaultValue: "" },
        Add2: { type: Sequelize.STRING, field: "Add2", defaultValue: "" },
        Add3: { type: Sequelize.STRING, field: "Add3", defaultValue: "" },
        ContactPerson: {
          type: Sequelize.STRING,
          field: "ContactPerson",
          defaultValue: "",
        },
        Fax: { type: Sequelize.STRING, field: "Fax", defaultValue: "" },
        SalesTaxNo: {
          type: Sequelize.STRING,
          field: "SalesTaxNo",
          defaultValue: "",
        },
        TelNo: { type: Sequelize.STRING, field: "TelNo", defaultValue: "" },
        Email: { type: Sequelize.STRING, field: "Email", defaultValue: "" },
        Website: { type: Sequelize.STRING, field: "Website", defaultValue: "" },
        MobNo: { type: Sequelize.STRING, field: "MobNo", defaultValue: "" },
        Notes: { type: Sequelize.STRING, field: "Notes", defaultValue: "" },
        NTN: { type: Sequelize.STRING, field: "NTN", defaultValue: "" },
        CNIC: { type: Sequelize.STRING, field: "CNIC", defaultValue: "" },
        Disabled: {
          type: Sequelize.BOOLEAN,
          field: "Disabled",
          defaultValue: false,
          allowNull: false,
        },
        claimedPer: {
          type: Sequelize.DECIMAL(10, 3),
          field: "claimedPer",
          defaultValue: 100,
          allowNull: false,
        },
        status: {
          type: Sequelize.BOOLEAN,
          field: "status",
          defaultValue: true,
          allowNull: false,
        },
        enable_date: {
          type: Sequelize.DATEONLY,
          field: "enable_date",
          allowNull: false,
        },
        disable_date: { type: Sequelize.DATEONLY, field: "disable_date" },
        CoID: {
          type: Sequelize.INTEGER,
          name: "CoID",
          field: "CoID",
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "Profile", key: "CoID" },
          allowNull: true,
        },
        MeterId: {
          type: Sequelize.INTEGER,
          field: "MeterId",
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "meters", key: "id" },
          name: "MeterId",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Billing",
      {
        BillingId: {
          type: Sequelize.BIGINT,
          field: "BillingId",
          primaryKey: true,
        },
        DocNo: { type: Sequelize.STRING, field: "DocNo", defaultValue: "" },
        DocDate: { type: Sequelize.DATE, field: "DocDate" },
        fromDate: { type: Sequelize.DATE, field: "fromDate" },
        toDate: { type: Sequelize.DATE, field: "toDate" },
        RatePerTonHour: {
          type: Sequelize.DECIMAL(18),
          field: "RatePerTonHour",
        },
        BoardMsg: {
          type: Sequelize.STRING,
          field: "BoardMsg",
          defaultValue: "",
        },
        IssueDate: { type: Sequelize.DATE, field: "IssueDate" },
        DueDate: { type: Sequelize.DATE, field: "DueDate" },
        Remarks: { type: Sequelize.STRING, field: "Remarks", defaultValue: "" },
        TransDate: { type: Sequelize.DATE, field: "TransDate" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        TransUID: {
          type: Sequelize.INTEGER,
          field: "TransUID",
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "users_web", key: "id" },
          name: "TransUID",
          allowNull: false,
        },
        CoID: {
          type: Sequelize.INTEGER,
          field: "CoID",
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "Profile", key: "CoID" },
          name: "CoID",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Billing_Details",
      {
        RowNo: {
          type: Sequelize.BIGINT,
          field: "RowNo",
          primaryKey: true,
          autoIncrement: true,
        },
        BillNo: {
          type: Sequelize.STRING,
          field: "BillNo",
          allowNull: false,
          defaultValue: "",
        },
        PreviousReadingTonHour: {
          type: Sequelize.DECIMAL(18, 2),
          field: "PreviousReadingTonHour",
        },
        CurrentReadingTonHour: {
          type: Sequelize.DECIMAL(18, 2),
          field: "CurrentReadingTonHour",
        },
        UnitsConsumedTonHour: {
          type: Sequelize.DECIMAL(18, 2),
          field: "UnitsConsumedTonHour",
        },
        RatePerTonHour: {
          type: Sequelize.DECIMAL(18, 2),
          field: "RatePerTonHour",
        },
        Amount: { type: Sequelize.DECIMAL(18, 2), field: "Amount" },
        OtherChargesText: {
          type: Sequelize.STRING,
          field: "OtherChargesText",
          defaultValue: "",
        },
        OtherCharges: { type: Sequelize.DECIMAL(18, 2), field: "OtherCharges" },
        ArrearsText: {
          type: Sequelize.STRING,
          field: "ArrearsText",
          defaultValue: "",
        },
        Arrears: { type: Sequelize.DECIMAL(18, 2), field: "Arrears" },
        TotalAmount: { type: Sequelize.DECIMAL(18, 2), field: "TotalAmount" },
        claimedPer: { type: Sequelize.DECIMAL(18, 3), field: "claimedPer" },
        TotalPayableAmount: {
          type: Sequelize.DECIMAL(18, 2),
          field: "TotalPayableAmount",
        },
        FromDate: { type: Sequelize.DATE, field: "FromDate" },
        ToDate: { type: Sequelize.DATE, field: "ToDate" },
        ServiceChargesText: {
          type: Sequelize.STRING,
          field: "ServiceChargesText",
          defaultValue: "",
        },
        ServiceCharges: {
          type: Sequelize.DECIMAL(18, 2),
          field: "ServiceCharges",
        },
        AdditionalChargesText: {
          type: Sequelize.STRING,
          field: "AdditionalChargesText",
          defaultValue: "",
        },
        AdditionalCharges: {
          type: Sequelize.DECIMAL(18, 2),
          field: "AdditionalCharges",
        },
        BillingId: {
          type: Sequelize.BIGINT,
          name: "BillingId",
          field: "BillingId",
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "Billing", key: "BillingId" },
          allowNull: true,
        },
        CID_web: {
          type: Sequelize.BIGINT,
          field: "CID_web",
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "Customer_web", key: "CId" },
          name: "CID_web",
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["Billing", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Billing_Details", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Profile", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Customer_web", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["floors_web", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["history_config", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["historytable", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["meters", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["permissions", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["roles", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["users_web", { transaction }],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
