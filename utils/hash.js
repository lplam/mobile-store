const encodeToken = () => {};

const decodeToken = () => {};

const checkAuthen = (req, res, next) => {
  const token = req.headers.authorization;
  //check decodeToken
  //1. check
  //2. convert obj

  if (1) {
    //true
    req.user_id = "6068317200c9a9eae987aa91";
    next();
  } else {
    //false
    res.json({ message: "permision denied" });
  }
};

module.exports = {
  encodeToken,
  decodeToken,
  checkAuthen,
};
