const { Tables } = require("../models");




// Create a new table
exports.createTable = async (req, res) => {
  try {
    const { name, capacity } = req.body;
    const newTable = await Tables.create({ name, capacity });
    res
      .status(201)
      .json({ message: "Table created successfully", table: newTable });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update table status
exports.updateTableStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const table = await Tables.findByPk(id);
    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }
    table.status = status;
    await table.save();
    res
      .status(200)
      .json({ message: "Table status updated successfully", table });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTablesData = async (req, res) => {
  const { id } = req.params;
  try {
    const tables = id ? await Tables.findByPk(id) : await Tables.findAll();
    if (!tables) {
      return res.status(404).json({ message: "Table not found" });
    }
    res.status(200).json(tables);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTable = async (req, res) => {
  const { id } = req.params;
  try {
    const table = await Tables.findByPk(id);
    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }
    await table.destroy();
    res.status(200).json({ message: "Table deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
