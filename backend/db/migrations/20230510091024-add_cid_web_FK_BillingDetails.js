const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * addColumn(CID) => "Billing_Details"
 *
 */

const info = {
  revision: 7,
  name: "add_cid_web_FK_BillingDetails",
  created: "2023-05-10T09:10:24.835Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "addColumn",
    params: [
      "Billing_Details",
      "CID_web",
      {
        type: Sequelize.BIGINT,
        field: "CID_web",
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
        references: { model: "Customer_web", key: "CId" },
        name: "CID_web",
        allowNull: true,
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["Billing_Details", "CID_web", { transaction }],
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
