const express = require("express");
const { signupAdmin, loginAdmin } = require("../controllers/authController");
const router = express.Router();
const {
  validateAdminSignUpBody,
  validateAdminLoginBody,
} = require("../controllers/authBodyChecker");

// Signup and Login for Admin
router.post("/signup", validateAdminSignUpBody, signupAdmin);
router.post("/login", validateAdminLoginBody, loginAdmin);

module.exports = router;
