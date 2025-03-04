const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.config");
const { SubCategory } = require("./categoryManagement/subCategory.model");

const MenuItem = sequelize.define(
  "MenuItem",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    images: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    subCategoryId: {
        type: DataTypes.INTEGER,
        references: {
            model: SubCategory,
            key: 'id',
        },
        allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = { MenuItem };
