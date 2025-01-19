const {sequelize} = require("../config/db.config");
const User = require("./user.model");
const Booking = require("./booking.model");
const Tables = require("./table.model");

// Relationships
User.hasMany(Booking, {     foreignKey: "userId", onDelete: "CASCADE" });
Booking.belongsTo(User, { foreignKey: "userId" });

Tables.hasMany(Booking, { foreignKey: "tableId", onDelete: "CASCADE" });
Booking.belongsTo(Tables, { foreignKey: "tableId" });

module.exports = { sequelize, User, Tables, Booking };

