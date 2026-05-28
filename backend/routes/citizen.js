const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const Citizen = require('../models/Citizen');
const District = require('../models/District');

// Get citizen profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const citizen = await Citizen.findById(req.citizen.id).populate('district');
    if (!citizen) {
      return res.status(404).json({ error: 'Citizen not found' });
    }
    res.json(citizen);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update citizen profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { fullName, email, dateOfBirth, gender, aadhaar, address, district, block, village, pinCode } = req.body;

    const citizen = await Citizen.findByIdAndUpdate(
      req.citizen.id,
      {
        fullName,
        email,
        dateOfBirth,
        gender,
        aadhaar,
        address,
        district,
        block,
        village,
        pinCode,
        updatedAt: new Date()
      },
      { new: true }
    );

    res.json({ message: 'Profile updated successfully', citizen });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
