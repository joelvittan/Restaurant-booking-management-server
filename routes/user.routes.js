const { verify } = require("jsonwebtoken");
const {
  register,
  login,
  getAllUsers,
  refreshToken,
  deleteUser,
  verifyLogin,
  updateUser,
} = require("../controllers/user.controller");
const verifyToken = require("../middlewares/auth.middleware");

express = require("express");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/refreshtoken", refreshToken);
router.post("/verifytoken", verifyToken,verifyLogin);

router.delete("/delete/:id", verifyToken, deleteUser);
router.put("/update/:id", verifyToken, updateUser);

router.get("/users",verifyToken, getAllUsers);
router.get("/users/:id",verifyToken, getAllUsers);

module.exports = router;
