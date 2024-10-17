const express = require("express");
const authRoutes = require("./authRoutes");
const adminRoutes = require("./adminRoutes");
const userAuthRoutes = require("./userAuthRoutes");
const router = express.Router();

// For sending and verifying OTP
router.use("/auth", authRoutes);

// For admin signup and login
router.use("/admin", adminRoutes);

// For user signup and login
router.use("/user", userAuthRoutes);

module.exports = router;
