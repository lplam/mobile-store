const nodemailer = require("nodemailer");
const MidCustomer = require("../middlewares/CustomerMiddleware");
const {encodeToken} = require("../utils/hash");

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
        const jwtData = {
          email: req.body.email,
          password: user.password
        };
        const mailOptions = {
          from: 'kietnodejs1997@gmail.com',
          to: req.body.email,
          subject: '[Moblie-Store] Email Restore Password',
          text: `Click at this link: http://localhost:3000/customer/changePassword?token=${encodeToken(jwtData)}`
        };
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
            res.json("Sent Email Restore Successfully");
          }
        });
      })
      .catch((err) => res.json("Email is not Exist: ",err))
}
module.exports = {
  sendForgotPasswordMail,
  };
