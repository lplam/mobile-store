const customerModel = require("../models/core/customer");
const bcrypt = require("bcrypt");
const {decodeTokenForgotPassWord} = require("../utils/hash");

const getUserByEmail = (email) => customerModel.findOne({ email});
const create = (data) => customerModel.create(data);
const getProfile = (user_id) => customerModel.findById(user_id);
function changeForgotPassword(req,res){
    return decodeTokenForgotPassWord(req,res)
        .then((data) => {
            return getUserByEmail(data.email)
                .then((user) => {
                    if (!user) {
                        return Promise.reject("User is not exist!!");
                    }
                    if(data.password === user.password){
                        return customerModel.findOneAndUpdate({ _id: user._id }, {password: bcrypt.hashSync(req.body.newPassword, 10)}, {new: true,
                        })
                        .then((data) => Promise.resolve("Change Password Successfully!",data))
                        .catch((err) => Promise.reject(err))
                    } else{
                    return res.json("Password changed");
                    }
                })
        })
        .catch((err) => res.json(err))
  }

module.exports = { create, getUserByEmail, getProfile,changeForgotPassword };
