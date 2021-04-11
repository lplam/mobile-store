const router = require("express").Router();
const AuthController = require("../controllers/AuthController");
const CustomerController = require("../controllers/CustomerController");
const { isCustomerAuth } = require("../utils/authen");
const { sendForgotPasswordMail,changeForgotPassword } = require("../utils/commons");
const { checkAuthen } = require("../utils/hash");

router.post("/login", AuthController.login);

router.post("/register", AuthController.register);

router.post("/forgotPassword", AuthController.forgotPassword);

router.get("/profile", isCustomerAuth, CustomerController.getProfile);

router.post("/sendMail", sendForgotPasswordMail);

router.patch("/changeForgotPassword", changeForgotPassword);



// router.put("/profile", AuthController.updateProfile);
module.exports = router;
