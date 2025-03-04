
const express = require("express");
const verifyToken = require("../../middlewares/auth.middleware");
const upload = require("../../utils/imageSave");
const { createCategory, deleteCategory, getAllCategories } = require("../../controllers/categoryControllers/category.controller");
const router = express.Router();



router.get("/",verifyToken,getAllCategories);

router.post("/create", upload.single("image"), verifyToken, createCategory);
router.delete("/delete/:id", verifyToken, deleteCategory);




module.exports = router;








