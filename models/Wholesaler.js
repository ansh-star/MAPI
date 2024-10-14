const mongoose = require('mongoose');

const wholesalerSchema = new mongoose.Schema({
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
  productList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  }],
  priceList: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    price: {
      type: Number,
      required: true,
      min: 0,  // Optional: Ensures price is a positive number
    }
  }]
});

const Wholesaler = mongoose.model('Wholesaler', wholesalerSchema);
module.exports = Wholesaler;
