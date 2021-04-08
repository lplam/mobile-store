const router = require("express").Router();
const AdminMiddleware = require("../middlewares/AdminMiddleware");
const ProductController = require("../controllers/ProductController");
const AuthController = require("../controllers/AuthController");
const { checkAuthen } = require("../utils/hash");
const { isAdminAuth } = require("../utils/authen");

router.post("/login", AuthController.loginAdmin);

router.post("/product", isAdminAuth, ProductController.create);

router.put("/product", isAdminAuth, ProductController.modify);

router.delete("/product", isAdminAuth, ProductController.destroy);

router.patch("/product", isAdminAuth, ProductController.restore);

router.delete("/product/force", isAdminAuth, ProductController.forceDestroy);

// router.put("/profile", AuthController.updateProfile);
module.exports = router;
