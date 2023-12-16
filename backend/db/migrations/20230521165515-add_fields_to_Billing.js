const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * removeColumn(CID) => "Billing_Details"
 * createTable() => "Billing", deps: [users_web, Profile]
 * addColumn(BillingBillingId) => "Billing_Details"
 * addColumn(CID_web) => "Billing_Details"
 * changeColumn(BillingId) => "Billing_Details"
 * changeColumn(CName) => "Customer_web"
 * changeColumn(Code) => "Customer_web"
 * changeColumn(Disabled) => "Customer_web"
 * changeColumn(claimedPer) => "Customer_web"
 *
 */

const info = {
  revision: 8,
  name: "add_fields_to_Billing",
  created: "2023-05-21T15:48:36.499Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "addColumn",
    params: [
      "Billing",
        "createdAt", {
            type: Sequelize.DATEONLY,
            field: "createdAt",
            allowNull: false,
            defaultValue: Sequelize.fn('getdate'),
          },
        { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["Billing", "createdAt", { transaction }],
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
