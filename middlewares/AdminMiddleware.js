const adminModel = require("../models/core/admin");
const getAdminByEmail = (email) => adminModel.findOne({ email });
const getDetail = (_id) => adminModel.findById(_id);
const {sendMailFromAdmin} = require("../utils/commons")
const MidCustomer = require("../middlewares/CustomerMiddleware");
const {encodeToken,decodeToken} = require("../utils/hash");

function sendMailForgotPassword(req,res){
    return MidCustomer.getUserByEmail(req.body.email)
      .then((user) => {
        if(!user){
          res.json("Email is not Exist");
        }
        const jwtData = {
          email: req.body.email,
          password: user.password
        };
        const mailOptions = {
          from: 'kietnodejs1997@gmail.com',
          to: req.body.email,
          subject: '[Moblie-Store] Email Restore Password',
          text: `Click at this link for changing your password: http://localhost:3000/customer/changePassword?token=${encodeToken(jwtData)}`
        };
        return sendMailFromAdmin(mailOptions)
            .then((data) => Promise.resolve(data))
            .catch((err) => Promise.reject(err))
      })
      .catch((err) => res.json("Email is not Exist: ",err))
}

module.exports = { getAdminByEmail, getDetail,sendMailForgotPassword };
