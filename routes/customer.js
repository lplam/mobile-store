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

router.post("/order",isCustomerAuth, CustomerController.createOrder);

router.get("/order",isCustomerAuth, CustomerController.getOrder);

router.post("/order/addProducts",isCustomerAuth, CustomerController.addProducts);

router.put("/order",isCustomerAuth, CustomerController.updateBasket);

router.patch("/order",isCustomerAuth, CustomerController.orderComfirmedByCustomer);


router.post("/testCode", testCode);



module.exports = router;
