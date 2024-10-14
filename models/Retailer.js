const mongoose = require('mongoose');

const retailerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  shopName: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,  // Changed to String for better handling
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
  dealershipLicenseNumber: {
    type: String,  // Changed to String for better handling
    required: true,
    unique: true,
  },
  dealershipLicenseImage: {
    type: String,  // Assuming this stores a URL or file path
    required: true,
  },
  cart: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    quantity: {
      type: Number,
      required: true,
    }
  }]
});

const Retailer = mongoose.model('Retailer', retailerSchema);
module.exports = Retailer;
