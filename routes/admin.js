const router = require("express").Router();
const AdminMiddleware = require("../middlewares/AdminMiddleware");
const ProductController = require("../controllers/ProductController");
const AuthController = require("../controllers/AuthController");
const { checkAuthen } = require("../utils/hash");

router.post("/login", AuthController.loginAdmin);

router.post("/product",checkAuthen,AdminMiddleware.isAdmin ,ProductController.create);

router.put("/product", ProductController.modify);

router.delete("/product", ProductController.destroy);

router.patch("/product", ProductController.restore);

router.delete("/product/force", ProductController.forceDestroy);

// router.put("/profile", AuthController.updateProfile);
module.exports = router;
