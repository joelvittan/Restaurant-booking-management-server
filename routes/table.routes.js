const {
  createTable,
  deleteTable,
  getTablesData,
  updateTable,
} = require("../controllers/table.controller");

const express = require("express");
const verifyToken = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/create",verifyToken, createTable); // Create a new table
router.put("/update/:id",verifyToken, updateTable); // Update table status
router.delete("/delete/:id", deleteTable); // Delete a table
router.get("/tables",verifyToken, getTablesData); // Get all tables data
router.get("/tables/:id", getTablesData); // Get all tables or a specific table by ID

module.exports = router;