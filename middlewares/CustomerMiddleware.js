const {users,baskets} = require("../models/core/customer");
const {products,configs} = require("../models/core/product");
const bcrypt = require("bcrypt");
const {decodeTokenForgotPassWord} = require("../utils/hash");
const ObjectId = require('mongoose').Types.ObjectId
const getUserByEmail = (email) => users.findOne({ email});
const create = (data) => users.create(data);
const createBasket = (data) => baskets.create(data);
const getProfile = (user_id) => {
    return users.aggregate([
        {
            $match : { _id: ObjectId(user_id)}
        },
        { $lookup: {
            "from": baskets.collection.name,
            "localField": "basket",
            "foreignField": "_id",
            "as": "basket"
        }},
        { "$unwind": {
            path: "$basket", 
            preserveNullAndEmptyArrays: true 
        }},
        { $lookup: {
            "from": products.collection.name,
            "localField": "basket.products.productID",
            "foreignField": "_id",
            "as": "basket.products"
        }},
        { "$unwind": {
            path: "$basket.products", 
            preserveNullAndEmptyArrays: true 
        }},
        { $lookup: {
            "from": products.collection.name,
            "localField": "basket.products.configuration",
            "foreignField": "_id",
            "as": "basket.products.configuration"
        }},
      ])
}
//users.findById(user_id);
function changeForgotPassword(req,res){
    return decodeTokenForgotPassWord(req,res)
        .then((data) => {
            return getUserByEmail(data.email)
                .then((user) => {
                    if (!user) {
                        return Promise.reject("User is not exist!!");
                    }
                    if(data.password === user.password){
                        return users.findOneAndUpdate({ _id: user._id }, {password: bcrypt.hashSync(req.body.newPassword, 10)}, {new: true,
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
module.exports = { create, getUserByEmail, getProfile,changeForgotPassword,createBasket };
