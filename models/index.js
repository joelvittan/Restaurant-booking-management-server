const { sequelize } = require("../config/db.config");
const Booking = require("./booking.model");
const Tables = require("./table.model");
const { Category } = require("./categoryManagement/category.model");
const { SubCategory } = require("./categoryManagement/subCategory.model");
const { MenuItem } = require("./menuItem.model");
const Order = require("./order.model");
const Users = require("./user.model");
const Payment = require("./payment.model");

// 🔹 Users & Bookings
Users.hasMany(Booking, { foreignKey: "userId", onDelete: "CASCADE" });
Booking.belongsTo(Users, { foreignKey: "userId", onDelete: "CASCADE" });

// 🔹 Tables & Bookings
Tables.hasMany(Booking, { foreignKey: "tableId", onDelete: "CASCADE" });
Booking.belongsTo(Tables, { foreignKey: "tableId", onDelete: "CASCADE" });

// 🔹 Booking & Order (FIXED)
Booking.hasOne(Order, { foreignKey: "bookingId", onDelete: "CASCADE" });
Order.belongsTo(Booking, { foreignKey: "bookingId", onDelete: "CASCADE" });

// 🔹 Categories & Subcategories
Category.hasMany(SubCategory, {
  foreignKey: "categoryId",
  onDelete: "CASCADE",
});
SubCategory.belongsTo(Category, {
  foreignKey: "categoryId",
  onDelete: "CASCADE",
});

//  Users & Orders
Users.hasMany(Order, { foreignKey: "userId", onDelete: "CASCADE" });
Order.belongsTo(Users, { foreignKey: "userId", onDelete: "CASCADE" });

//  Subcategories & Menu Items
SubCategory.hasMany(MenuItem, {
  foreignKey: "subCategoryId",
  onDelete: "CASCADE",
});
MenuItem.belongsTo(SubCategory, {
  foreignKey: "subCategoryId",
  onDelete: "CASCADE",
});

//  Orders & Payments (FIXED)
Order.hasOne(Payment, { foreignKey: "orderId", onDelete: "CASCADE" });
Payment.belongsTo(Order, { foreignKey: "orderId", onDelete: "CASCADE" });

module.exports = {
  sequelize,
  Users,
  Tables,
  Booking,
  Category,
  SubCategory,
  MenuItem,
  Order,
  Payment,
};
