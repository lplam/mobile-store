const MidCustomer = require("../middlewares/CustomerMiddleware");

const getProfile = (req, res) =>
  MidCustomer.getProfile(req.user_id)
    .then((data) => res.json({ data }))
    .catch((err) => res.json({ err }));

module.exports = { getProfile };
