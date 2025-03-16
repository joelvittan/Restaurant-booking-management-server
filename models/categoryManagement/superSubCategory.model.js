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
       
        allowNull: false,
    },
    subCategoryId: {
        type: DataTypes.INTEGER,
      
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

