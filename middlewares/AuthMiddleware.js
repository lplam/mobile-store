const customerModel = require("../models/core/customer");
const MidCustomer = require("./CustomerMiddleware");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY, EXPIRES_IN } = require("../constants");

const login = ({ email, password }) => {
  return MidCustomer.getUserByEmail(email).then((user) => {
    if (!user) {
      return Promise.reject("Email doesn't exist!!");
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return Promise.reject("Password is not correct!");
    }
    const jwtData = {
      id: user._id,
    };
    const result = {
      token: jwt.sign(jwtData, SECRET_KEY, { expiresIn: EXPIRES_IN }),
      ...user._doc,
    };
    return result;
  });
};

const register = (data) => {
  const { password, email, phone } = data;
  return MidCustomer.getUserByEmail(email).then((user) => {
    if (user) {
      return Promise.reject("Email already exist!!");
    }
    const newUser = {
      email,
      phone,
      password: bcrypt.hashSync(password, 10),
    };
    return MidCustomer.create(newUser);
  });
};

module.exports = {
  login,
  register,
};
