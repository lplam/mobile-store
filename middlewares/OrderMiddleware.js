const {orders} = require("../models/core/order");

const getBasket = (user_id)=> {
    return orders.findOne({userID: user_id, status: 1});
}

const getOrder = (user_id,status)=> {
    return orders.find({userID: user_id, status: status});
}

const create = (newOrder) => orders.create(newOrder);
module.exports = { getBasket, getOrder,create};
