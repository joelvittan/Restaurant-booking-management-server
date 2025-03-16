const { db } = require("./env");

module.exports = {
  development: {
    username: db.user,
    password: db.password,
    database: db.database,
    host: db.host,
    dialect: "mysql",
  },
  test: {
    username: db.user,
    password: db.password,
    database: db.database,
    host: db.host,
    dialect: "mysql",
  },
  production: {
    username: db.user,
    password: db.password,
    database: db.database,
    host: db.host,
    dialect: "mysql",
  },
};
