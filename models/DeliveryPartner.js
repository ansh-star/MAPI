const mongoose = require('mongoose');

const deliveryPartnerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  mobileNumber: {
    type: String,  // Changed to String for flexibility
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
  orderReceived: {
    type: Boolean,
    default: false,
  },
  orderDelivered: {
    type: Boolean,
    default: false,
  },
  orderOtp: {
    type: String,  // Changed to String for flexibility with OTP formats
    required: true,
  },
});

const DeliveryPartner = mongoose.model('DeliveryPartner', deliveryPartnerSchema);
module.exports = DeliveryPartner;
