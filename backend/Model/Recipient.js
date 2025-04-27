const mongoose = require('mongoose');

const RecipientSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true
  },
  bloodType: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],  // Enforcing blood types
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
  reason: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  }
});

const RecipientModel = mongoose.model("Recipient", RecipientSchema);
module.exports = RecipientModel;
