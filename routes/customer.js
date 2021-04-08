const router = require("express").Router();
const AuthController = require("../controllers/AuthController");
const CustomerController = require("../controllers/CustomerController");
const { isCustomerAuth } = require("../utils/authen");
const { checkAuthen } = require("../utils/hash");

router.post("/login", AuthController.login);

router.post("/register", AuthController.register);

router.get("/profile", isCustomerAuth, CustomerController.getProfile);

// router.put("/profile", AuthController.updateProfile);
module.exports = router;
