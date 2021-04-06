const jwt = require("jsonwebtoken");
const { SECRET_KEY, EXPIRES_IN } = require("../constants");

const encodeToken = (jwtData) => {
  return jwt.sign(jwtData, SECRET_KEY, { expiresIn: EXPIRES_IN })
};

const decodeToken = (req) => {
  const token = req.headers.authorization;
  if (req.headers && token && token.split(' ')[0] === 'Bearer'){
    var jwtToken =  req.headers.authorization.split(' ')[1];
    return jwt.verify(jwtToken, SECRET_KEY, { expiresIn: EXPIRES_IN },function(err, payload){
      if(err){
        return Promise.reject({message: 'Unauthorized user!'});
      } else{
        return Promise.resolve(payload);
      }
    })
  } else {
    res.status(401).json({ message: 'Unauthorized user!' });
  }
};

const checkAuthen = (req, res, next) => {
  
  decodeToken(req)
  .then((data) => {
    req.user_id = data.id;
    next();
  })
  .catch((message) => res.status(401).json(message))

  // const token = req.headers.authorization;
  // if (req.headers && token && token.split(' ')[0] === 'Bearer') {
  //   var jwtToken =  req.headers.authorization.split(' ')[1];
  //   jwt.verify(jwtToken, SECRET_KEY, { expiresIn: EXPIRES_IN }, function(err, payload) {
  //     if (err) {
  //       res.status(401).json({message: 'Unauthorized user!'});
  //     } else {
  //       res.send(payload);
  //       console.log('decoder: ' + payload.username);
  //       // find
  //       User.findOne({
  //             'username': payload.username
  //         }, function(err, user) {
  //           if (user) {
  //             req.user = user;
  //             next();
  //           } else {
  //             res.status(401).json({ message: 'Unauthorized user!' });
  //           }
  //         })
  //     }
  //   });
  // } else {
  //   res.status(401).json({ message: 'Unauthorized user!' });
  // }
  //check decodeToken
  //1. check
  //2. convert obj

  // if (1) {
  //   //true
  //   req.user_id = "6068317200c9a9eae987aa91";
  //   next();
  // } else {
  //   //false
  //   res.json({ message: "permision denied" });
  // }
};

module.exports = {
  encodeToken,
  decodeToken,
  checkAuthen,
};
