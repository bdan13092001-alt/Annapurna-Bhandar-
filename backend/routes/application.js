const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const Application = require('../models/Application');
const Citizen = require('../models/Citizen');

// Generate unique application ID
const generateApplicationId = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `AB-${timestamp}-${random}`;
};

// Create new application
router.post('/create', authMiddleware, async (req, res) => {
  try {
    const { beneficiaryType, aadhaar, familySize, monthlyIncome, bankAccountHolder, bankAccountNumber, bankIfsc } = req.body;

    const citizen = await Citizen.findById(req.citizen.id);
    if (!citizen) {
      return res.status(404).json({ error: 'Citizen not found' });
    }

    const application = new Application({
      citizen: req.citizen.id,
      applicationId: generateApplicationId(),
      beneficiaryType,
      aadhaar,
      familySize,
      monthlyIncome,
      bank: {
        accountHolder: bankAccountHolder,
        accountNumber: bankAccountNumber,
        ifsc: bankIfsc
      }
    });

    await application.save();
    res.json({ message: 'Application created successfully', application });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all applications for a citizen
router.get('/my-applications', authMiddleware, async (req, res) => {
  try {
    const applications = await Application.find({ citizen: req.citizen.id }).sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get application details
router.get('/:applicationId', authMiddleware, async (req, res) => {
  try {
    const application = await Application.findOne({ applicationId: req.params.applicationId })
      .populate('citizen')
      .populate('reviewedBy');
    
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    // Check if citizen owns this application
    if (application.citizen._id.toString() !== req.citizen.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    res.json(application);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
