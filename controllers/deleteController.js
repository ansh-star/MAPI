const User = require("../models/User");
const deleteAdminDetails = async (req, res) => {
  try {
    // Deletede a user
    const deletedAdmin = await Admin.findOneAndDelete({ _id: req.user.id });

    if (!deletedAdmin) {
      return res.status(400).json({
        success: false,
        msg: "Admin does not exists with this id.",
      });
    }

    // Respond with success
    res.status(201).json({
      success: true,
      message: "Admin deleted successfully!",
      user: deletedAdmin.toObject(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const deleteUserDetails = async (req, res) => {
  try {
    // Delete a user
    const existingUser = await User.findOneAndDelete({ _id: req.user.id });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        msg: "User does not exists with this id.",
      });
    }
    // Respond with success
    res.status(201).json({
      success: true,
      message: "User deleted successfully!",
      user: existingUser.toObject(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { deleteUserDetails, deleteAdminDetails };
