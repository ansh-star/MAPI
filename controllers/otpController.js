const axios = require('axios');
const Admin = require('../models/Admin');
const Wholesaler = require('../models/Wholesaler');
const Retailer = require('../models/Retailer');
const DeliveryPartner = require('../models/DeliveryPartner');
const { generateToken } = require('../utils/tokenGenerator');  // Assume token generation function is available

// Function to send OTP
const sendOTP = async (req, res) => {
  const { phone } = req.body;

  if (!phone || phone.length !== 10) {
    return res.status(400).json({ status: false, message: 'Phone number must be exactly 10 digits' });
  }

  try {
    const response = await axios.post('http://3.90.148.206:3000/send-otp', { phone });
    res.json({
      status: true,
      message: 'OTP sent successfully',
      sessionId: response.data.Details, // Session ID for further verification
    });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Error sending OTP', error: error.message });
  }
};

// Function to verify OTP and log in the user based on role
const verifyOTP = async (req, res) => {
  const { phone, otp, adminKey } = req.body;

  if (!phone || !otp) {
    return res.status(400).json({ status: false, message: 'Phone and OTP are required' });
  }

  try {
    const response = await axios.post('http://3.90.148.206:3000/verify-otp', { phone, otp });

    if (response.data.Status !== 'Success') {
      return res.status(400).json({ status: false, message: 'Invalid OTP' });
    }

    // Step 1: Check if Admin login is attempted (adminKey provided)
    if (adminKey) {
      const admin = await Admin.findOne({ mobileNumber: phone, adminKey });
      if (!admin) {
        return res.status(403).json({ status: false, message: 'Invalid Admin credentials' });
      }

      // Admin successfully logged in
      return res.json({
        status: true,
        message: 'Admin login successful',
        role: 'admin',
        user: {
          id: admin._id,
          username: admin.username,
          location: admin.location,
        },
        token: generateToken(admin),  // JWT token generation for Admin
      });
    }

    // Step 2: Check for Wholesaler login
    const wholesaler = await Wholesaler.findOne({ mobileNumber: phone });
    if (wholesaler) {
      return res.json({
        status: true,
        message: 'Wholesaler login successful',
        role: 'wholesaler',
        user: {
          id: wholesaler._id,
          username: wholesaler.username,
          shopName: wholesaler.shopName,
        },
        token: generateToken(wholesaler),  // JWT token generation for Wholesaler
      });
    }

    // Step 3: Check for Retailer login
    const retailer = await Retailer.findOne({ mobileNumber: phone });
    if (retailer) {
      return res.json({
        status: true,
        message: 'Retailer login successful',
        role: 'retailer',
        user: {
          id: retailer._id,
          username: retailer.username,
          shopName: retailer.shopName,
        },
        token: generateToken(retailer),  // JWT token generation for Retailer
      });
    }

    // Step 4: Check for Delivery Partner login
    const deliveryPartner = await DeliveryPartner.findOne({ mobileNumber: phone });
    if (deliveryPartner) {
      return res.json({
        status: true,
        message: 'Delivery Partner login successful',
        role: 'delivery',
        user: {
          id: deliveryPartner._id,
          username: deliveryPartner.username,
          location: deliveryPartner.location,
        },
        token: generateToken(deliveryPartner),  // JWT token generation for Delivery Partner
      });
    }

    // If no user matches the provided phone number
    return res.status(404).json({ status: false, message: 'User not found for the provided phone number' });

  } catch (error) {
    res.status(500).json({ status: false, message: 'OTP verification failed', error: error.message });
  }
};

module.exports = { sendOTP, verifyOTP };
