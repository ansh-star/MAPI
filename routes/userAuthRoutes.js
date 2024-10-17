const express = require("express");
const { signupUser, loginUser } = require("../controllers/authController");
const {
  validateUserSignupBody,
  validateUserLoginBody,
} = require("../controllers/authBodyChecker");

const router = express.Router();

router.post("/signup", validateUserSignupBody, signupUser);
router.post("/login", validateUserLoginBody, loginUser);

module.exports = router;
