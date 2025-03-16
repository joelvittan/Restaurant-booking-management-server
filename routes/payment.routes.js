
const express = require("express");
const verifyToken = require("../middlewares/auth.middleware");
const { getAllPayments } = require("../controllers/payment.controller");
router = express.Router();






router.get("/", verifyToken, getAllPayments);
// router.post("/create", verifyToken, createOrder);


module.exports = router;