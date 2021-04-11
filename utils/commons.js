const nodemailer = require("nodemailer");
const MidCustomer = require("../middlewares/CustomerMiddleware");
const bcrypt = require("bcrypt");
const {encodeToken,decodeToken} = require("../utils/hash");
const customerModel = require("../models/core/customer");

function sendForgotPasswordMail(req,res,next) {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'kietnodejs1997@gmail.com',
          pass: 'redagon291'
        }
      });
      MidCustomer.getUserByEmail(req.body.email)
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
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
            res.json("Error: ", error);
          } else {
            console.log('Email sent: ' + info.response);
            res.json("Sent Email Restore Successfully");
          }
        });
      })
      .catch((err) => res.json("Email is not Exist: ",err))
}
function changeForgotPassword(req,res,next){
  decodeToken(req)
  .then((data) => {
    return MidCustomer.getUserByEmail(data.email).then((user) => {
      if (!user) {
        return Promise.reject("User is not exist!!");
      }
      if(data.password === user.password){
        customerModel.findOneAndUpdate({ _id: user._id }, {password: bcrypt.hashSync(req.body.newPassword, 10)}, {
          new: true,
        })
        .then((data) => res.json({ message: "Change Password Successfully!", data }))
        .catch((err) => res.json("Change Password fail: ",err))
      } else{
        return res.json("Password changed");
      }
    });
  })
  .catch((err) => res.json(err))
}
module.exports = {
  sendForgotPasswordMail,
  changeForgotPassword,
  };
