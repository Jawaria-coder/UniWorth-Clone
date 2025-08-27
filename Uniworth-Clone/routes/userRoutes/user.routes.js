const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const userModel = require("../../models/user.model");
const categoryModel = require("../../models/categories.model");

router.use(cookieParser());

// Render Login/Register Page
router.get("/register", (req, res) => {
  res.render("Register/login-register", { layout: false, error: null, success: null });
});

// Register User
router.post("/create", async (req, res) => {
  const { username, email, password } = req.body;


    //if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.render("Register/login-register", {
        layout: false,
        error: "Email already registered. Please log in.",
        success: null,
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // new user
    await userModel.create({ username, email, password: hashedPassword });

    res.render("Register/login-register", {
      layout: false,
      error: null,
      success: "Account created successfully! You can now log in.",
    });
});

// Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;


    const user = await userModel.findOne({ email });
    if (!user) {
      return res.render("Register/login-register", {
        layout: false,
        error: "Invalid email or password.",
        success: null,
      });
    }

    // Compare the password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.render("Register/login-register", {
        layout: false,
        error: "Invalid email or password.",
        success: null,
      });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { email: user.email, role: user.role || "user" }, 
      "shhhh", 
      { expiresIn: "1d" }
    );

    // Set the token in cookies
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Enable in production
      sameSite: "strict", // Prevent CSRF attacks
    });

    // Save user details in the session
    // req.session.user = {
    //   id: user._id,
    //   email: user.email,
    //   role: user.role || "user",
    // };

    if (user.role === "admin") {
      return res.redirect("/admin"); 
    }

    const categories = await categoryModel.find(); 
    // res.render("MainPage/bootstrap", { layout: false, categories });
    res.redirect("/");

});

// Logout User
router.get("/logout", (req, res) => {
  res.clearCookie("token"); 
  res.redirect("/login/register"); 
});

module.exports = router;



// router.get("/logout", (req, res) => {
//   // Destroy the session
//   req.session.destroy((err) => {
//     if (err) {
//       console.error("Error destroying session:", err);
//     }
//     res.redirect("/register");
//   });
// });
