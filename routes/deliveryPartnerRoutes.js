const express = require('express');
const router = express.Router();
const DeliveryAgent = require('../models/DeliveryPartner');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Delivery Agent Signup
router.post('/signup', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newDeliveryAgent = new DeliveryAgent({ username, password: hashedPassword, email });

    await newDeliveryAgent.save();
    const token = jwt.sign({ username, role: 'delivery-agent' }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'Delivery agent created successfully', token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create delivery agent' });
  }
});

module.exports = router;
