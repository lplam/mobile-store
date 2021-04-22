const {orders} = require("../models/core/order");
const {products,configs} = require("../models/core/product");

const getBasket = (user_id)=> {
    return orders.findOne({userID: user_id, status: 1});
}

const getOrder = (user_id,status)=> {
    return orders.find({userID: user_id, status: status});
}
const countTotalAmount = (user_id) =>{
    return orders.aggregate([
        {
            $match: { 
                userID: user_id,
                status: 1
            }
        },
        { "$unwind": {
            path: "$products", 
            preserveNullAndEmptyArrays: true 
        }},
        {
            $lookup:{
              "from": products.collection.name,
              "localField": "products.productID",
              "foreignField": "_id",
              "as": "products.productID"
            }
        },
        { "$unwind": {
            path: "$products.productID", 
            preserveNullAndEmptyArrays: true 
        }},
        {
            $project:{
                userID:1,
                total: { $multiply: [ "$products.productID.cost", "$products.quantity" ] }
            },
        },
        {
            $group:{
              _id: "$userID",
              totalAmount: {$sum:"$total"}
            }
        },  
    ])
}

const create = (newOrder) => orders.create(newOrder);
module.exports = { getBasket, getOrder,create,countTotalAmount};
