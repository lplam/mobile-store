const adminModel = require("../models/core/admin");

const getAdminByEmail = (email) => adminModel.findOne({ email });
const getDetail = (_id) => adminModel.findById(_id);

module.exports = { getAdminByEmail, getDetail };
