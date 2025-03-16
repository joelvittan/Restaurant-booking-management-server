const { Payment } = require("../models");

exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll();
    res.status(200).json({ payments, success: true });
  } catch (error) {
    res.status(500).json({ error: error.message, success: false });
  }
};
