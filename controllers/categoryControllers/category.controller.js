const { Category } = require("../../models/categoryManagement/category.model");
const upload = require("../../utils/imageSave");
const { categoryValidator } = require("../../validators/category.validators");

exports.createCategory = async (req, res) => {
  const { error } = categoryValidator(req.body);
  if (error) return res.status(400).json({ message: error.details });

  try {
    const { name, description } = req.body;
    const imagePath = req.file ? req.file.path : null; // Get uploaded file path
    if (!imagePath) {
      return res.status(400).json({ error: "Image upload failed" });
    }

    console.log(imagePath);
    const category = new Category({ name, description, image: imagePath });
    await category.save();

    res.status(201).json({
      message: "category created successfully",
      category,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error creating category", error, success: false });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json({ categories, success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error getting categories", error, success: false });
  }
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    await category.destroy();
    res
      .status(200)
      .json({ message: "Category deleted successfully", success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error deleting category", error, success: false });
  }
};
