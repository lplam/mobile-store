const router = require("express").Router();
const AuthController = require("../controllers/AuthController");
const CustomerController = require("../controllers/CustomerController");
const AdminController = require("../controllers/AdminController");

const { isCustomerAuth } = require("../utils/authen");
const { checkAuthen,testCode } = require("../utils/hash");

router.post("/login", AuthController.login);

router.post("/register", AuthController.register);

router.post("/forgotPassword", AuthController.forgotPassword);

router.get("/profile", isCustomerAuth, CustomerController.getProfile);

router.post("/sendMail", AdminController.sendMailForgotPassword);

router.patch("/changeForgotPassword", CustomerController.changeForgotPassword);

router.post("/testCode", testCode);

module.exports = router;
