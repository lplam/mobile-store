const jwt = require("jsonwebtoken");
const { SECRET_KEY, EXPIRES_IN } = require("../constants");

const encodeToken = (jwtData) => {
  return jwt.sign(jwtData, SECRET_KEY, { expiresIn: EXPIRES_IN });
};

const decodeToken = (req) => {
  const token = req.headers.authorization;
  if (req.headers && token && token.split(" ")[0] === "Bearer") {
    var jwtToken = req.headers.authorization.split(" ")[1];
    return jwt.verify(
      jwtToken,
      SECRET_KEY,
      { expiresIn: EXPIRES_IN },
      function (err, payload) {
        if (err) {
          return Promise.reject({ message: "Unauthorized user!" });
        } else {
          return Promise.resolve(payload);
        }
      }
    );
  } else {
    res.status(401).json({ message: "Unauthorized user!" });
  }
};

const decodeTokenForgotPassWord = (req,res) => {
  const token = req.body.token;
  if (token) {
    var jwtToken = token;
    return jwt.verify(
      jwtToken,
      SECRET_KEY,
      { expiresIn: EXPIRES_IN },
      function (err, payload) {
        if (err) {
          return Promise.reject({ message: "Unauthorized user!" });
        } else {
          return Promise.resolve(payload);
        }
      }
    );
  } else {
    res.status(401).json({ message: "Unauthorized user!" });
  }
};


module.exports = {
  encodeToken,
  decodeToken,
  decodeTokenForgotPassWord,
};
