const express = require('express');
const authRoutes = require('./authRoutes');
const adminRoutes = require('./adminRoutes');
const retailerRoutes = require('./retailerRoutes');
const wholesalerRoutes = require('./wholesalerRoutes');
const deliveryPartnerRoutes = require('./deliveryPartnerRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/retailer', retailerRoutes);
router.use('/wholesaler', wholesalerRoutes);
router.use('/delivery-partner', deliveryPartnerRoutes);

module.exports = router;