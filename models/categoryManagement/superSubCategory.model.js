const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db.config");
const { Category } = require("./category.model");
const { SubCategory } = require("./subCategory.model");

const SuperSubCategory = sequelize.define("superSubCategory", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    categoryId: {
        type: DataTypes.INTEGER,
        references: {
            model: Category,
            key: 'id',
        },
        allowNull: false,
    },
    subCategoryId: {
        type: DataTypes.INTEGER,
        references: {
            model: SubCategory,
            key: 'id',
        },
        allowNull: false,
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
    }
    
});


module.exports = { SuperSubCategory };

