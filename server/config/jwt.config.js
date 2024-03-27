const jwt = require("jsonwebtoken");
const secret = "I can't believe this key is so secret!";
module.exports.secret = "first key value";
module.exports.authenticate = (req, res, next) => {
  jwt.verify(req.cookies.usertoken, "first key value", (err, payload) => {
    if (err) { 

      res.status(401).json({verified: false, mes : err,token: req.cookies.usertoken});
    } else {
      next();
    }
  });
}