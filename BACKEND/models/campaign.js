const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  suiwid: {
    type: String,
    required: true,
  },
  campaignName: {
    type: String,
    required: true,
    trim: true,
  },
  campaignObjective: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['active', 'paused', 'completed'],
    default: 'active'
  },
  adTitle: {
    type: String,
    required: true,
    trim: true,
  },
  adDescription: {
    type: String,
    trim: true,
  },
  adImage: {
    type: String,
    required: true,
  },
  adLink: {
    type: String,
    required: true,
  },
  totalBudget: {
    type: Number,
    required: true,
  },
  spent: {
    type: Number,
    default: 0
  },
  totalDays: {
    type: Number,
  },
  cpc: {
    type: Number,
    required: true,
  },
  interests: {
    type: [String],
  },
  locations: {
    type: [{
      name: String,
      code: String,
      flag: String,
    }],
  },
  metrics: {
    impressions: {
      type: Number,
      default: 0
    },
    clicks: {
      type: Number,
      default: 0
    },
    conversions: {
      type: Number,
      default: 0
    }
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, 
{
  timestamps: true
});

// Calculate CTR virtual field
campaignSchema.virtual('ctr').get(function() {
  if (!this.metrics.impressions) return '0%';
  return ((this.metrics.clicks / this.metrics.impressions) * 100).toFixed(2) + '%';
});

module.exports = mongoose.model('Campaign', campaignSchema);