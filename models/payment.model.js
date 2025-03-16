const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.config");

const Payment = sequelize.define(
  "payment",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
     
    },
    paymentDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    paymentStatus: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },

  {
    tableName: "payment",
  }
);
module.exports = Payment;
