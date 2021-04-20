const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  phone: { type: String, default: "" },
  email: { type: String, default: "", index: true },
  password: { type: String, default: "" },
  basket: { type: Schema.Types.ObjectId, ref: 'baskets' },
});

const userBasket = new mongoose.Schema({
  _id: { type: Schema.Types.ObjectId, ref: 'users' },
  products: [{productID: {type: Schema.Types.ObjectId,  ref: 'products'}}],
});

const users = mongoose.model("users", userSchema);
const baskets = mongoose.model("baskets", userBasket);

module.exports = {users,baskets};
