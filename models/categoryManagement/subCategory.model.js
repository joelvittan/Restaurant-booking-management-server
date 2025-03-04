const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db.config");
const { Category } = require("./category.model");

const SubCategory = sequelize.define("subCategory", {
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
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    categoryId: {
        type: DataTypes.INTEGER,
        references: {
            model: Category,
            key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: false,
        foreignKey: true,
    },
});

module.exports = { SubCategory };

