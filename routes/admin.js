const router = require("express").Router();
const AdminController = require("../controllers/AdminController");
const ProductController = require("../controllers/ProductController");
const { checkAuthen } = require("../utils/hash");

router.post("/product", ProductController.create);

router.put("/product", ProductController.modify);

router.delete("/product", ProductController.destroy);

router.patch("/product", ProductController.restore);

router.delete("/product/force", ProductController.forceDestroy);

// router.put("/profile", AuthController.updateProfile);
module.exports = router;
