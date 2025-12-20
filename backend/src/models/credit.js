const mongoose = require('mongoose');

const creditSchema = new mongoose.Schema({
  farmId: {
    type: String,
    required: [true, 'Farm ID is required'],
    trim: true
  },
  baselineEmission: {
    type: Number,
    required: [true, 'Baseline emission is required'],
    min: [0, 'Baseline emission cannot be negative']
  },
  actualEmission: {
    type: Number,
    required: [true, 'Actual emission is required'],
    min: [0, 'Actual emission cannot be negative']
  },
  creditsGenerated: {
    type: Number,
    required: true,
    min: [0, 'Credits generated cannot be negative'],
    default: function() {
      // Calculate credits as the difference between baseline and actual
      return Math.max(0, this.baselineEmission - this.actualEmission);
    }
  },
  status: {
    type: String,
    enum: ['pending', 'verified', 'sold'],
    default: 'pending'
  },
  verificationDate: {
    type: Date
  },
  soldDate: {
    type: Date
  },
  soldTo: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for faster queries
creditSchema.index({ farmId: 1 });
creditSchema.index({ status: 1 });
creditSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Credit', creditSchema);
