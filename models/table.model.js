const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.config");

const Tables = sequelize.define(
  "Tables",
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
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("available", "reserved", "occupied"),
      defaultValue: "available",
    },
    qrCode: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
  
  },
  {
    timestamps: false,
  }
);

module.exports = Tables;
