const adminModel = require("../models/core/admin");
const getAdminByEmail = (email) => adminModel.findOne({ email });
const isAdmin = (req,res,next) => {
    adminModel.findById(req.user_id)
    .then(next())
    .catch(res.json('Admin is not Exist'))
}
module.exports = { getAdminByEmail,isAdmin};
