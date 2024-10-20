const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/User"); // Import your User model
const { generateToken } = require("../utils/tokenGenerator");

// Function to handle Admin signup
const signupAdmin = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { username, mobileNumber, location, adminKey } = req.body;
  try {
    const isExistUser = await Admin.findOne({ mobileNumber });

    if (isExistUser) {
      return res.status(200).json({
        success: true,
        message: "Phone Number already Exists",
      });
    }

    const admin = new Admin({ username, mobileNumber, location, adminKey });
    await admin.save();
    res.status(201).json({
      success: true,
      message: "Admin registered successfully!",
      role: 3,
      user: {
        id: admin._id,
        username: admin.username,
        location: admin.location,
      },
      token: generateToken(admin),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Admin registration failed",
      error: error.message,
    });
  }
};

// Signup function for user
const signupUser = async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "User Sign Up failed",
      errors: errors.array(),
    });
  }

  const {
    username,
    fullName,
    shopOrHospitalName,
    mobileNumber,
    location,
    email,
    dealershipLicenseNumber,
    dealershipLicenseImage,
    role,
    addressList,
  } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ mobileNumber });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this mobile number.",
      });
    }

    // If the role is Wholeseller (0) or Retailer (1), ensure mandatory fields are provided
    if (role === 0 || role === 1) {
      if (
        !shopOrHospitalName ||
        !dealershipLicenseNumber ||
        !dealershipLicenseImage
      ) {
        return res.status(400).json({
          status: false,
          message:
            "Shop/Hospital Name, Dealership License Number, and Dealership License Image are required for Wholeseller and Retailer.",
        });
      }
    }

    // Create a new user
    const newUser = new User({
      username,
      fullName,
      shopOrHospitalName,
      mobileNumber,
      location,
      email,
      dealershipLicenseNumber,
      dealershipLicenseImage,
      role,
      addressList,
      user_verified: false, // Initially set to false
    });

    // Save the user to the database
    await newUser.save();

    // Respond with success
    res.status(201).json({
      success: true,
      message: "User created successfully!",
      user: newUser.toObject(),
      token: generateToken(newUser),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Function to handle Admin login
const loginAdmin = async (req, res) => {
  const { mobileNumber, adminKey } = req.body;

  try {
    const admin = await Admin.findOne({ mobileNumber, adminKey })
      .populate({
        path: "wholesalerRequests", // Path to populate
        match: { role: 1, user_verified: false }, // Condition: Only fetch users with role: 1 (wholesalers) and user_verified: false
      })
      .populate("productList");
    if (!admin) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid credentials" });
    }

    const token = generateToken({ _id: admin._id, role: 3 });

    res.json({
      success: true,
      message: "Login successful",
      user: admin.toObject(),
      token: generateToken(admin),
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Login failed", error: error.message });
  }
};

// Login function for User
const loginUser = async (req, res) => {
  const { mobileNumber } = req.body;

  try {
    // Check if the user exists by mobile number and username
    const user = await User.findOne({ mobileNumber })
      .populate("product")
      .populate({
        path: "cart.productId", // Populates the 'productId' inside 'cart'
      });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid mobile number or username.",
      });
    } else {
      // Successful login, return user data (you might want to include a JWT token here for session management)
      return res.status(200).json({
        success: true,
        message: "Login successful!",
        user: {
          id: user._id,
          username: user.username,
          fullName: user.fullName,
          mobileNumber: user.mobileNumber,
          role: user.role,
          addressList: user.addressList,
          products: user.products,
          cart: user.cart,
        },
        token: generateToken(user),
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
module.exports = {
  signupAdmin,
  signupUser,
  loginAdmin,
  loginUser,
};
