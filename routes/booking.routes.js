const {
  getBookings,
  createBooking,
  approveBooking,
} = require("../controllers/booking.controller");

const express = require("express");
const verifyToken = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/", verifyToken, getBookings);
router.post("/create", verifyToken, createBooking);
router.post("/approve/:id", verifyToken,approveBooking );

module.exports = router;
