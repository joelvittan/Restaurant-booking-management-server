const { getAllMenuItems, createMenuItem } = require("../controllers/menu.controller");
const verifyToken = require("../middlewares/auth.middleware");
const upload = require("../utils/imageSave");

const router = express.Router();





router.get("/",verifyToken, getAllMenuItems);
// router.get("/menuItems/:id", getAllMenuItems);
router.post("/create",upload.array("image", 3), verifyToken, createMenuItem);
// router.put("/menuItems/:id", updateMenuItem);
// router.delete("/menuItems/:id", deleteMenuItem);

module.exports = router;
