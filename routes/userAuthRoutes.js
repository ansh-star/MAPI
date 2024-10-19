const express = require("express");
const { signupUser, loginUser } = require("../controllers/authController");
const {
  validateUserSignupBody,
  validateUserLoginBody,
} = require("../controllers/authBodyChecker");
const { updateUserDetails } = require("../controllers/updateController");
const { verifyToken } = require("../utils/tokenGenerator");
const { deleteUserDetails } = require("../controllers/deleteController");

const router = express.Router();

router.post("/signup", validateUserSignupBody, signupUser);
router.post("/login", validateUserLoginBody, loginUser);
router.use(verifyToken);
router.put("", updateUserDetails);
router.delete("", deleteUserDetails);

module.exports = router;
