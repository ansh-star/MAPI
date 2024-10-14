const express = require('express');
const {
    signupAdmin,
    loginAdmin,
} = require('../controllers/authController');
const router = express.Router();

// Signup and Login for Admin
router.post('/signup', signupAdmin);
router.post('/login', loginAdmin);

module.exports = router;
