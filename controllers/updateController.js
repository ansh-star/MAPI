const Admin = require("../models/Admin");
const User = require("../models/User");

const updateAdminDetails = async (req, res) => {
  const { username, mobileNumber, location } = req.body;
  try {
    const updatedAdmin = await Admin.findOneAndUpdate(
      { _id: req.user, id },
      { username, mobileNumber, location },
      { new: true }
    );

    if (!isExistUser) {
      return res.status(200).json({
        success: false,
        message: "Admin does not exists",
      });
    }

    res.status(201).json({
      success: true,
      message: "Admin registered successfully!",
      user: updatedAdmin.toObject(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Admin updation failed",
      error: error.message,
    });
  }
};
const updateUserDetails = async (req, res) => {
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
    // Create a new user
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user.id },
      {
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
      },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(400).json({
        success: false,
        msg: "User does not exists with this id.",
      });
    }
    // Respond with success
    res.status(201).json({
      success: true,
      message: "User updated successfully!",
      user: updatedUser.toObject(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { updateUserDetails, updateAdminDetails };
