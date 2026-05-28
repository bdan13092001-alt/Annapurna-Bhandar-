const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  citizen: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Citizen',
    required: true
  },
  applicationId: {
    type: String,
    unique: true,
    required: true
  },
  applicationDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Pending', 'Under Review', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  beneficiaryType: {
    type: String,
    enum: ['NFSA', 'OBC', 'ST', 'SC', 'General'],
    required: true
  },
  aadhaar: {
    type: String,
    required: true,
    match: /^[0-9]{12}$/
  },
  familySize: {
    type: Number,
    required: true
  },
  monthlyIncome: {
    type: Number,
    required: true
  },
  bank: {
    accountHolder: String,
    accountNumber: String,
    ifsc: String
  },
  documents: [{
    type: String,
    url: String,
    uploadedAt: Date
  }],
  remarks: String,
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  },
  reviewDate: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Application', applicationSchema);
