// models/User.js
const mongoose = require('mongoose');

const rewardActivitySchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ['Ad Impression', 'Ad Click'],
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  });
  
  const userSchema = new mongoose.Schema({
    suiwid: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    balance: {
      type: Number,
      default: 0
    },
    totalEarned: {
      type: Number,
      default: 0
    },
    rewardActivity: [rewardActivitySchema]
  }, {
    timestamps: true
  });
  
  const User = mongoose.model('User', userSchema);
  module.exports = User;