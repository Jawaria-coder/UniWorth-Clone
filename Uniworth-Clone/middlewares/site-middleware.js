const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

module.exports = async function (req, res, next) {
  try {
    const token = req.cookies?.token;
    if (token) {
      const decoded = jwt.verify(token, "shhhh");
      const user = await User.findOne({ email: decoded.email });
      if (user) {
        req.user = user;
        res.locals.user = user; 
        res.locals.username = user.username;
      }
    } else {
      res.locals.user = null;
      res.locals.username = null;
    }
    next();
  } catch (error) {
    console.error("Site Middleware Error:", error.message);
    res.locals.user = null;
    next();
  }
};
