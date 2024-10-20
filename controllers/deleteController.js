const Product = require("../models/Product");
const User = require("../models/User");
const Roles = require("../utils/roles");
const deleteAdminDetails = async (req, res) => {
  try {
    // Deleted a user
    const deletedAdmin = await Admin.findOneAndDelete({ _id: req.user.id });

    if (!deletedAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin does not exists with this id.",
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
        message: "User does not exists with this id.",
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

const deleteProducts = async (req, res) => {
  const { id: userId, role } = req.user;
  const { id: productId } = req.body;
  try {
    if (role === Roles.DELIVERY_PARTNER || role === Roles.RETAILER) {
      return res.status(400).json({
        success: false,
        message: "This role cannot delete the product",
      });
    } else if (role === Roles.WHOLESALER) {
      const userProductDeletion = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { products: productId } },
        { new: true }
      );
      if (!userProductDeletion) {
        return res.status(400).json({
          success: false,
          message: "This user does not exists with this id.",
        });
      }
    }
    const deletedProduct = await Product.findOneAndDelete({ _id: productId });

    if (!deletedProduct) {
      return res.status(400).json({
        success: false,
        message: "Product does not exists with this id.",
      });
    }

    await User.updateMany(
      { "cart.productId": deletedProduct._id },
      { $pull: { cart: { productId: deletedProduct._id } } }
    );

    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
      user: userProductDeletion.toObject(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { deleteUserDetails, deleteAdminDetails, deleteProducts };
