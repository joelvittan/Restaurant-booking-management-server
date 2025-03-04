const { createCategory, getAllCategories, deleteCategory } = require("../../controllers/category.controller");

const express = require("express");
const verifyToken = require("../../middlewares/auth.middleware");
const upload = require("../../utils/imageSave");
const router = express.Router();



router.get("/",verifyToken,getAllCategories);

router.post("/create", upload.single("image"), verifyToken, createCategory);
router.delete("/delete/:id", verifyToken, deleteCategory);




module.exports = router;








