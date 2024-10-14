const express = require('express');
const {
    signupRetailer,
    loginRetailer,
} = require('../controllers/authController');
const router = express.Router();

// Signup and Login for Retailer
router.post('/signup', signupRetailer);
router.post('/login', loginRetailer);

module.exports = router;
