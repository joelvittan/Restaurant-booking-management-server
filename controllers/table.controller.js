const { Tables } = require("../models");
const { generateQRCode } = require("../utils/qrCodeGenerator");
const {
  tableValidator,
  updateTableSchema,
} = require("../validators/table.validators");

// Create a new table
exports.createTable = async (req, res, next) => {
  const { name, capacity,qrCode } = req.body;
  try {
    const existingTable = await Tables.findOne({ where: { name } });
    if (existingTable) {
      return res
        .status(400)
        .json({ message: "Table with this name already exists" });
    }
    const newTable = await Tables.create({ name, capacity,qrCode });
    // const qrCode = await generateQRCode(newTable.id, newTable.name, newTable.capacity);
    newTable.qrCode = qrCode;
    await newTable.save();
    res
      .status(201)
      .json({ message: "Table created successfully", table: newTable,success: true });
  } catch (error) {
    res.status(500).json({ error: error.message,success: false });
  }
};

// Update table status
exports.updateTable = async (req, res) => {
  const { error } = tableValidator(req.body, updateTableSchema);
  if (error) {
    return res.status(400).json({ message: error.details });
  }
  try {
    const { id } = req.params;
    const table = await Tables.findByPk(id);
    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }
    if (req.body.name) {
      table.name = req.body.name;
    }
    if (req.body.capacity) {
      table.capacity = req.body.capacity;
    }
    if (req.body.status) {
      table.status = req.body.status;
    }
    await table.save();
    res.status(200).json({ message: "Table updated successfully", table ,success: true});
  } catch (error) {
    res.status(500).json({ error: error.message,success: false });
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
    res.status(200).json({ message: "Table deleted successfully",success: true });
  } catch (error) {
    res.status(500).json({ error: error.message ,success: false});
  }
};
