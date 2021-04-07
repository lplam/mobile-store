const mongoose = require("mongoose");
const mongoose_delete = require('mongoose-delete');

const productSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  brand: { type: String, default: ""},
  discount: { type: String, default: ""},
  configuration: { type: String, default: "" },
  description: { type: String, default: "" },
});

productSchema.plugin(mongoose_delete,{
  deletedAt: true,
  overrideMethods: 'all'
});
const products = mongoose.model("products", productSchema);
module.exports = products;
