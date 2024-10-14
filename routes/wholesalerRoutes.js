const express = require('express');
const {
    signupWholesaler,
    loginWholesaler,
} = require('../controllers/authController');
const router = express.Router();

// Signup and Login for Wholesaler
router.post('/signup', signupWholesaler);
router.post('/login', loginWholesaler);

module.exports = router;
