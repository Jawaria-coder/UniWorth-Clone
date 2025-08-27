const express = require("express");
const router = express.Router();
const adminMiddleware = require("../middlewares/admin-middleware");

router.get("/", adminMiddleware, (req, res) => {
  res.render("admin-panel");
});

module.exports = router;
