const jwt = require("jsonwebtoken");
const User = require("../models/user.model");


const isAuthenticated = (req, res, next) => {
    if (!req.user || !req.user._id) {
        return res.status(401).render('Register/login-register', {
            layout: false,
            error: 'Sorry, please log in first.',
            success: null,
        });
    }
    next();
  };
  

  
  
  module.exports = isAuthenticated ;
  