const Product = require("../models/Product");
const User = require("../models/User");
const Roles = require("../utils/roles");

const addProduct = async (req, res) => {
  const { id, role } = req.user;

  // delivery partner cannot add products
  if (role === Roles.DELIVERY_PARTNER || role === Roles.RETAILER) {
    res
      .status(400)
      .json({ success: false, message: "This role cannot add a product" });
  }
  const {
    Medicine_Name,
    Composition,
    Uses,
    Side_effects,
    Image_URL,
    Manufacturer,
  } = req.body;

  try {
    // Create a new product
    const newProduct = new Product({
      Medicine_Name,
      Composition,
      Uses,
      Side_effects,
      Manufacturer,
      Image_URL,
    });

    // Save the product to MongoDB
    await newProduct.save();

    // if user is not admin the add the product id to the user schema
    if (role === Roles.WHOLESALER) {
      const userUpdated = await User.findOneAndUpdate(
        { _id: id },
        { $push: { products: newProduct._id } },
        { new: true }
      )
        .populate("products")
        .populate({ path: "cart.productId" });

      return res.status(201).json({
        message: "Product created successfully",
        product: newProduct.toObject(),
        user: userUpdated.toObject(),
      });
    } else if (role === Roles.ADMIN) {
      return res.status(201).json({
        message: "Product created successfully",
        product: newProduct.toObject(),
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create product", details: error.message });
  }
};

module.exports = { addProduct };
