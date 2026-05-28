const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { adminAuthMiddleware } = require('../middleware/auth');
const Admin = require('../models/Admin');
const Application = require('../models/Application');
const Citizen = require('../models/Citizen');

// Admin Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await admin.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token, admin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all applications (with pagination)
router.get('/applications', adminAuthMiddleware, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const applications = await Application.find()
      .populate('citizen')
      .populate('reviewedBy')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Application.countDocuments();

    res.json({
      applications,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get applications by status
router.get('/applications/status/:status', adminAuthMiddleware, async (req, res) => {
  try {
    const { status } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const applications = await Application.find({ status })
      .populate('citizen')
      .populate('reviewedBy')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Application.countDocuments({ status });

    res.json({
      applications,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Approve application
router.post('/approve/:applicationId', adminAuthMiddleware, async (req, res) => {
  try {
    const { remarks } = req.body;
    
    const application = await Application.findByIdAndUpdate(
      req.params.applicationId,
      {
        status: 'Approved',
        remarks,
        reviewedBy: req.admin.id,
        reviewDate: new Date()
      },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.json({ message: 'Application approved', application });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Reject application
router.post('/reject/:applicationId', adminAuthMiddleware, async (req, res) => {
  try {
    const { remarks } = req.body;

    const application = await Application.findByIdAndUpdate(
      req.params.applicationId,
      {
        status: 'Rejected',
        remarks,
        reviewedBy: req.admin.id,
        reviewDate: new Date()
      },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.json({ message: 'Application rejected', application });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get dashboard statistics
router.get('/dashboard/stats', adminAuthMiddleware, async (req, res) => {
  try {
    const totalApplications = await Application.countDocuments();
    const pendingApplications = await Application.countDocuments({ status: 'Pending' });
    const underReviewApplications = await Application.countDocuments({ status: 'Under Review' });
    const approvedApplications = await Application.countDocuments({ status: 'Approved' });
    const rejectedApplications = await Application.countDocuments({ status: 'Rejected' });
    const totalCitizens = await Citizen.countDocuments();

    res.json({
      totalApplications,
      pendingApplications,
      underReviewApplications,
      approvedApplications,
      rejectedApplications,
      totalCitizens
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
