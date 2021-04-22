const MidCustomer = require("../middlewares/CustomerMiddleware");

const getProfile = (req, res) =>{
  MidCustomer.getProfile(req.user_id)
    .then((data) => res.json({ data }))
    .catch((err) => res.json({ err }));
}

const changeForgotPassword = (req, res) =>{
  MidCustomer.changeForgotPassword(req,res)
    .then((data) => res.json(data))
    .catch((err) => res.json(err))
}

const createOrder = (req, res) =>{
  MidCustomer.createOrder(req,res)
    .then((data) => res.json(data))
    .catch((err) => res.json(err))
}

const getOrder = (req, res) =>{
  MidCustomer.getOrder(req,res)
    .then((data) => res.json(data))
    .catch((err) => res.json(err))
}

module.exports = { getProfile,changeForgotPassword,createOrder,getOrder };
