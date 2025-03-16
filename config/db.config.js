const { Sequelize } = require("sequelize");
const { db } = require("./env");
const sequelize = new Sequelize(
  db.database,
  db.user,
  db.password,

  {
    host: db.host,
    dialect: "mysql",
    logging: false,
  },
);

module.exports = { sequelize };

