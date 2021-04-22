const {users} = require("../models/core/customer");
const {products,configs} = require("../models/core/product");
const bcrypt = require("bcrypt");
const {decodeTokenForgotPassWord} = require("../utils/hash");
const ObjectId = require('mongoose').Types.ObjectId
const MidOrder = require("./OrderMiddleware");
const getUserByEmail = (email) => users.findOne({ email});
const create = (data) => users.create(data);
const getProfile = (user_id) => users.findById(user_id);
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
async function createOrder(req,res) {
    const { nameSender, mailSender,addressSender, phoneNumberSender,nameReceiver,addressReceiver,phoneNumberReceiver} = req.body;
    let order = await MidOrder.getBasket(req.user_id);
    if(order){
        return Promise.reject("Basket is already exist!!");
    } 
    const newOrder ={
        userID: req.user_id,
        status: 1,
        nameSender,
        mailSender,
        addressSender,
        phoneNumberSender,
        nameReceiver,
        addressReceiver,
        phoneNumberReceiver,
    };  
    return await MidOrder.create(newOrder);
} 

async function getOrder(req,res) {
    let orders = await MidOrder.getOrder(req.user_id,req.body.status);
    if(Array.isArray(orders) && orders.length){
        return orders
    } 
    switch(req.body.status){
        case 1:
            return "Basket isn't exist!";
        case 2:
            return "Order  isn't exist!";
        default:
            return "Status Wrong!";
    }    
} 

module.exports = { create, getUserByEmail, getProfile,changeForgotPassword,createOrder,getOrder };



    // return users.aggregate([
    //     {
    //         $match : { _id: ObjectId(user_id)}
    //     },
    //     { $lookup: {
    //         "from": baskets.collection.name,
    //         "localField": "basket",
    //         "foreignField": "_id",
    //         "as": "basket"
    //     }},
    //     { "$unwind": {
    //         path: "$basket", 
    //         preserveNullAndEmptyArrays: true 
    //     }},
    //     { $lookup: {
    //         "from": products.collection.name,
    //         "localField": "basket.products.productID",
    //         "foreignField": "_id",
    //         "as": "basket.products"
    //     }},
    //     { "$unwind": {
    //         path: "$basket.products", 
    //         preserveNullAndEmptyArrays: true 
    //     }},
    //     { $lookup: {
    //         "from": configs.collection.name,
    //         "localField": "basket.products.configuration",
    //         "foreignField": "_id",
    //         "as": "basket.products.configuration"
    //     }}
    //   ])