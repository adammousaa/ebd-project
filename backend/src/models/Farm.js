const mongoose = require('mongoose');

const farmSchema = new mongoose.Schema(
  {
    farmName: {
      type: String,
      required: [true, 'Farm name is required'],
      trim: true,
      maxlength: [100, 'Farm name cannot exceed 100 characters']
    },
    
    farmerName: {
      type: String,
      required: [true, 'Farmer name is required'],
      trim: true
    },
    
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    
    phone: {
      type: String,
      trim: true
    },
    
    farmSize: {
      type: Number,
      required: [true, 'Farm size is required'],
      min: [0.1, 'Farm size must be at least 0.1 acres']
    },
    
    farmType: {
      type: String,
      required: [true, 'Farm type is required'],
      enum: ['crop', 'livestock', 'mixed', 'dairy', 'poultry', 'organic', 'other']
    },
    
    address: {
      type: String,
      trim: true
    },
    
    latitude: {
      type: Number,
      required: [true, 'Latitude is required'],
      min: [-90, 'Latitude must be between -90 and 90'],
      max: [90, 'Latitude must be between -90 and 90']
    },
    
    longitude: {
      type: Number,
      required: [true, 'Longitude is required'],
      min: [-180, 'Longitude must be between -180 and 180'],
      max: [180, 'Longitude must be between -180 and 180']
    },
    
    farmId: {
      type: String,
      unique: true,
      default: function() {
        // Generate unique farm ID like FARM-ABC123
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substr(2, 6).toUpperCase();
        return `FARM-${timestamp}-${random}`;
      }
    },
    
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false // Optional for now, can link to user account later
    },
    
    status: {
      type: String,
      enum: ['active', 'inactive', 'pending_verification'],
      default: 'pending_verification'
    },
    
    registrationDate: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true // Adds createdAt and updatedAt automatically
  }
);

// Indexes for faster queries
farmSchema.index({ farmId: 1 });
farmSchema.index({ email: 1 });
farmSchema.index({ status: 1 });
farmSchema.index({ userId: 1 });
farmSchema.index({ latitude: 1, longitude: 1 }); // For geospatial queries

module.exports = mongoose.model('Farm', farmSchema);