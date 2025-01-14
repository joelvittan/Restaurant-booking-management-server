const {
  register,
  login,
  getAllUsers,
  refreshToken,
} = require("../controllers/user.controller");

express = require("express");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/refreshtoken", refreshToken);

router.get("/users", getAllUsers);
router.get("/users/:id", getAllUsers);

module.exports = router;
