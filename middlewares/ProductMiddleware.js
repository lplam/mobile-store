const productModel = require("../models/core/product");

const getProductByName = (name) => productModel.findOne({ name });
const getProductByID = (product_id) => productModel.findById(product_id);
const getProductDeleted = (product_id) =>
  productModel.findOneDeleted({ _id: product_id });

const create = (data) => {
  const { name, brand, discount, configuration, description } = data;
  return getProductByName(name).then((product) => {
    if (product) {
      return Promise.reject("Product already exist!!");
    }
    const newProduct = {
      name,
      brand,
      discount,
      configuration,
      description,
    };
    return productModel.create(newProduct);
  });
};

const modify = (data) => {
  return getProductByID(data.query.id).then((product) => {
    if (!product) {
      return Promise.reject("Product is not exist!!");
    }
    return productModel.findOneAndUpdate({ _id: data.query.id }, data.body, {
      new: true,
    });
  });
};

const destroy = (data) => {
  return getProductByID(data.query.id).then((product) => {
    if (!product) {
      return Promise.reject("Product is not exist!!");
    }
    return productModel.delete({ _id: data.query.id });
  });
};

const restore = (data) => {
  return getProductDeleted(data.query.id).then((product) => {
    if (!product) {
      return Promise.reject("Product is not exist!!");
    }
    return productModel.restore({ _id: data.query.id });
  });
};

const forceDestroy = (data) => {
  return getProductDeleted(data.query.id).then((product) => {
    if (!product) {
      return Promise.reject("Product is not exist!!");
    }
    return productModel.deleteOne({ _id: data.query.id });
  });
};

module.exports = {
  create,
  modify,
  destroy,
  forceDestroy,
  restore,
};
