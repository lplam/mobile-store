const customerModel = require("../models/core/customer");
const getUserByEmail = (email) => customerModel.findOne({ email });
const create = (data) => customerModel.create(data);

const getProfile = (user_id) => customerModel.findById(user_id);
module.exports = { create, getUserByEmail, getProfile };
