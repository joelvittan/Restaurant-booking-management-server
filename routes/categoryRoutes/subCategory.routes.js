const { createCategory, getAllCategories, deleteCategory } = require("../../controllers/categoryControllers/category.controller");

const express = require("express");
const verifyToken = require("../../middlewares/auth.middleware");
const upload = require("../../utils/imageSave");
const { createSubCategory, getAllSubCategories, deleteSubCategory } = require("../../controllers/categoryControllers/subCategory.controler");
const router = express.Router();



router.get("/",verifyToken,getAllSubCategories);

router.post("/create", upload.single("image"), verifyToken, createSubCategory);
router.delete("/delete/:id", verifyToken, deleteSubCategory);




module.exports = router;








