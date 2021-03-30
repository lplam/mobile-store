
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  phone: { type: String, default: "" },
  email: { type: String, default: "", index: true },
  username: { type: String, default: "" },
  password: { type: String, default: "" },
  
});

const users = mongoose.model("users", userSchema);
module.exports = users;
