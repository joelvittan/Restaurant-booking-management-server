const { Category } = require("../../models");
const {
  SubCategory,
} = require("../../models/categoryManagement/subCategory.model");
const { deleteImage } = require("../../utils/imageDelete");
const upload = require("../../utils/imageSave");

exports.createSubCategory = async (req, res) => {
  try {
    const { name, description, categoryId } = req.body;
    const imagePath = req.file ? req.file.path : null; // Get uploaded file path
    if (!imagePath) {
      return res.status(400).json({ error: "Image upload failed" });
    }

    console.log(imagePath);
    const subCategory = new SubCategory({
      name,
      description,
      image: imagePath,
      categoryId,
    });
    await subCategory.save();

    res.status(201).json({
      message: "SubCategory created successfully",
      subCategory,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error creating SubCategory", error, success: false });
  }
};

exports.getAllSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.findAll({
      include: [
        {
          model: Category,

        },
      ],
    });
    res.status(200).json({ subCategories, success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error getting categories", error, success: false });
  }
};

exports.deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const subCategory = await SubCategory.findByPk(id);
    if (!subCategory) {
      return res.status(404).json({ message: "SubCategory not found", success: false });
    }
    deleteImage(subCategory?.image);
  
    await subCategory.destroy();
    res.status(200).json({ message: "SubCategory deleted successfully", success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error deleting SubCategory", error, success: false });
  }
};
