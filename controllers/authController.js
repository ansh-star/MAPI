const Admin = require("../models/Admin");
const Retailer = require("../models/Retailer");
const Wholesaler = require("../models/Wholesaler");
const DeliveryPartner = require("../models/DeliveryPartner");
const { sendOTP, verifyOTP } = require("./otpController");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

// Function to handle Admin signup
const signupAdmin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { username, mobileNumber, location, adminKey } = req.body;
  try {
    const admin = new Admin({ username, mobileNumber, location, adminKey });
    await admin.save();
    res
      .status(201)
      .json({ status: true, message: "Admin registered successfully!" });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Admin registration failed",
      error: error.message,
    });
  }
};

// Function to handle Retailer signup
const signupRetailer = async (req, res) => {
  const {
    username,
    fullName,
    shopName,
    mobileNumber,
    location,
    dealershipLicenseNumber,
    dealershipLicenseImage,
  } = req.body;

  try {
    const retailer = new Retailer({
      username,
      fullName,
      shopName,
      mobileNumber,
      location,
      dealershipLicenseNumber,
      dealershipLicenseImage,
    });
    await retailer.save();
    res
      .status(201)
      .json({ status: true, message: "Retailer registered successfully!" });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Retailer registration failed",
      error: error.message,
    });
  }
};

// Function to handle Wholesaler signup
const signupWholesaler = async (req, res) => {
  const {
    username,
    fullName,
    shopName,
    mobileNumber,
    location,
    dealershipLicenseNumber,
    dealershipLicenseImage,
  } = req.body;

  try {
    const wholesaler = new Wholesaler({
      username,
      fullName,
      shopName,
      mobileNumber,
      location,
      dealershipLicenseNumber,
      dealershipLicenseImage,
    });
    await wholesaler.save();
    res
      .status(201)
      .json({ status: true, message: "Wholesaler registered successfully!" });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Wholesaler registration failed",
      error: error.message,
    });
  }
};

// Function to handle Delivery Partner signup
const signupDeliveryPartner = async (req, res) => {
  const { username, mobileNumber, location } = req.body;

  try {
    const deliveryPartner = new DeliveryPartner({
      username,
      mobileNumber,
      location,
    });
    await deliveryPartner.save();
    res.status(201).json({
      status: true,
      message: "Delivery Partner registered successfully!",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Delivery Partner registration failed",
      error: error.message,
    });
  }
};

// Function to handle Admin login
const loginAdmin = async (req, res) => {
  const { mobileNumber, adminKey } = req.body;

  try {
    const admin = await Admin.findOne({ mobileNumber, adminKey });
    if (!admin) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ status: true, message: "Login successful", token });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "Login failed", error: error.message });
  }
};

// Function to handle Retailer login
const loginRetailer = async (req, res) => {
  const { mobileNumber, dealershipLicenseNumber } = req.body;

  try {
    const retailer = await Retailer.findOne({
      mobileNumber,
      dealershipLicenseNumber,
    });
    if (!retailer) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: retailer._id, role: "retailer" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ status: true, message: "Login successful", token });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "Login failed", error: error.message });
  }
};

// Function to handle Wholesaler login
const loginWholesaler = async (req, res) => {
  const { mobileNumber, dealershipLicenseNumber } = req.body;

  try {
    const wholesaler = await Wholesaler.findOne({
      mobileNumber,
      dealershipLicenseNumber,
    });
    if (!wholesaler) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: wholesaler._id, role: "wholesaler" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ status: true, message: "Login successful", token });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "Login failed", error: error.message });
  }
};

// Function to handle Delivery Partner login
const loginDeliveryPartner = async (req, res) => {
  const { mobileNumber } = req.body;

  try {
    const deliveryPartner = await DeliveryPartner.findOne({ mobileNumber });
    if (!deliveryPartner) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: deliveryPartner._id, role: "deliveryPartner" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ status: true, message: "Login successful", token });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "Login failed", error: error.message });
  }
};

module.exports = {
  signupAdmin,
  signupRetailer,
  signupWholesaler,
  signupDeliveryPartner,
  loginAdmin,
  loginRetailer,
  loginWholesaler,
  loginDeliveryPartner,
};
