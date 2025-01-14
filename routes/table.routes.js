const {
  createTable,
  updateTableStatus,
  deleteTable,
  getTablesData,
} = require("../controllers/table.controller");

const express = require("express");
const router = express.Router();

router.post("/create", createTable); // Create a new table
router.put("/update/:id", updateTableStatus); // Update table status
router.delete("/delete/:id", deleteTable); // Delete a table
router.get("/tables", getTablesData); // Get all tables data
router.get("/tables/:id", getTablesData); // Get all tables or a specific table by ID

module.exports = router;
