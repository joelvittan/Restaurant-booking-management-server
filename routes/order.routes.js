const express = require("express");
const verifyToken = require("../middlewares/auth.middleware");
const { getAllOrders, createOrder, updateOrderStatus } = require("../controllers/order.controller");
const router = express.Router();


router.get("/", verifyToken, getAllOrders);
router.post("/create", verifyToken, createOrder);
router.put("/update/:id", verifyToken, updateOrderStatus);


module.exports = router;
