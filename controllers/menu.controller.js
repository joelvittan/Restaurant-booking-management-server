const { MenuItem, Category, SubCategory } = require("../models");
const { deleteImage } = require("../utils/imageDelete");

exports.getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.findAll({
      include: [
        {
          model: SubCategory,
          include: [
            {
              model: Category,
            },
          ],
        },
      ],
    });
    res.status(200).json({ menuItems, success: true });
  } catch (error) {
    res.status(500).json({ error: error.message, success: false });
  }
};

exports.createMenuItem = async (req, res) => {
  try {
    const { name, description, price, subCategoryId, quantity } = req.body;
    console.log(req.files);
    const imagePaths = req.files ? req.files.map((file) => file.path) : []; // Get uploaded file paths
    console.log(imagePaths);
    const menuItem = await MenuItem.create({
      name,
      description,
      price,
      quantity,
      subCategoryId,
      images: JSON.stringify(imagePaths),
    });

    res.status(201).json({
      message: "Menu item created successfully",
      menuItem,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: error.message, success: false });
  }
};

exports.updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, subCategoryId, quantity } = req.body;
    const menuItem = await MenuItem.findByPk(id);
    if (!menuItem) {
      return res
        .status(404)
        .json({ message: "Menu item not found", success: false });
    }
    const oldImages = menuItem.images ? JSON.parse(menuItem.images) : [];
    if (req.files) {
      oldImages.forEach((image) => {
        deleteImage(image);
      });
    }

    const imagePaths = req.files
      ? req.files.map((file) => file.path)
      : menuItem.images
      ? JSON.parse(menuItem.images)
      : []; // Get uploaded file paths
    menuItem.name = name || menuItem.name;
    menuItem.description = description || menuItem.description;
    menuItem.price = price || menuItem.price;
    menuItem.quantity = quantity || menuItem.quantity;
    menuItem.subCategoryId = subCategoryId || menuItem.subCategoryId;
    menuItem.images = JSON.stringify(imagePaths);
    await menuItem.save();
    res.status(200).json({
      message: "Menu item updated successfully",
      menuItem,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: error.message, success: false });
  }
};
