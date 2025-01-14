const app = require("./app");
const { sequelize } = require("./config/db.config");
const { db, port } = require("./config/env");
require("dotenv").config();

console.log("creds", db, " port", port);




sequelize
  .sync()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(port, () => {
      console.log(`Server is running on port http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
  });
