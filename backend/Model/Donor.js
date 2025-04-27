

const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  bloodType: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  lastDonation: {
    type: Date, 
    default: null
  },
  donationCount: {
    type: Number,
    default: 0
  },
  contactNumber: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'loginUsers'
  }
}, { timestamps: true });

module.exports = mongoose.model('Donor', donorSchema);
