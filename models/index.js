const {sequelize} = require("../config/db.config");
const User = require("./user.model");
const Booking = require("./booking.model");
const Tables = require("./table.model");
const { Category } = require("./categoryManagement/category.model");
const { SubCategory } = require("./categoryManagement/subCategory.model");
const { MenuItem } = require("./menuItem.model");

// Relationships
User.hasMany(Booking, {     foreignKey: "userId", onDelete: "CASCADE" });
Booking.belongsTo(User, { foreignKey: "userId" });

Tables.hasMany(Booking, { foreignKey: "tableId", onDelete: "CASCADE" });
Booking.belongsTo(Tables, { foreignKey: "tableId" });

Category.hasMany(SubCategory, { foreignKey: "categoryId", onDelete: "CASCADE" });
SubCategory.belongsTo(Category, { foreignKey: "categoryId" });



SubCategory.hasMany(MenuItem, { foreignKey: "subCategoryId"});
MenuItem.belongsTo(SubCategory, { foreignKey: "subCategoryId" });



module.exports = { sequelize, User, Tables, Booking,Category,SubCategory ,MenuItem};

