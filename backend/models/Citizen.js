const mongoose = require('mongoose');

const citizenSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    match: /^[6-9]\d{9}$/
  },
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    lowercase: true
  },
  aadhaar: {
    type: String,
    unique: true,
    sparse: true,
    match: /^[0-9]{12}$/
  },
  dateOfBirth: Date,
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other']
  },
  address: String,
  district: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'District'
  },
  block: String,
  village: String,
  pinCode: {
    type: String,
    match: /^[0-9]{6}$/
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  otp: String,
  otpExpiry: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Citizen', citizenSchema);
