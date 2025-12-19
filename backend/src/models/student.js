const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  year: { 
    type: String, 
    enum: ['freshman','sophomore','junior','senior','grad'], 
    default: 'freshman' 
  },
  interests: [{ 
    type: String 
  }],
  gpa: { 
    type: Number, 
    min: 0, 
    max: 4.0 
  },
  completedCourses: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Course' 
  }],
  
  // ===== PURCHASE-RELATED FIELDS ADDED =====
  totalPurchases: {
    type: Number,
    default: 0,
    min: 0
  },
  purchaseRequestsCount: {
    type: Number,
    default: 0,
    min: 0
  },
  lastPurchaseDate: {
    type: Date
  },
  purchaseLimit: {
    type: Number,
    default: 1000, // $1000 default purchase limit
    min: 0
  },
  usedPurchaseAmount: {
    type: Number,
    default: 0,
    min: 0
  },
  availablePurchaseAmount: {
    type: Number,
    default: function() {
      return this.purchaseLimit - this.usedPurchaseAmount;
    },
    min: 0
  },
  
  // Optional: Store recent purchase IDs
  recentPurchaseRequests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PurchaseRequest'
  }],
  
  // Purchase preferences/settings
  purchaseSettings: {
    autoSaveRequests: {
      type: Boolean,
      default: false
    },
    notificationOnApproval: {
      type: Boolean,
      default: true
    },
    defaultShippingAddress: {
      type: String,
      default: ''
    }
  },
  
  // Statistics
  averagePurchaseAmount: {
    type: Number,
    default: 0
  },
  purchaseCategories: [{
    category: String,
    count: Number,
    totalAmount: Number
  }],
  // ===== END PURCHASE FIELDS =====
  
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for available purchase amount (calculated)
StudentSchema.virtual('remainingPurchaseLimit').get(function() {
  return Math.max(0, this.purchaseLimit - this.usedPurchaseAmount);
});

// Virtual for purchase success rate
StudentSchema.virtual('purchaseApprovalRate').get(function() {
  if (this.purchaseRequestsCount === 0) return 0;
  return (this.totalPurchases / this.purchaseRequestsCount) * 100;
});

// Method to check if student can make a purchase
StudentSchema.methods.canMakePurchase = function(amount) {
  return this.usedPurchaseAmount + amount <= this.purchaseLimit;
};

// Method to update purchase stats
StudentSchema.methods.updatePurchaseStats = function(amount) {
  this.usedPurchaseAmount += amount;
  this.totalPurchases += 1;
  this.lastPurchaseDate = new Date();
  
  // Update average purchase amount
  this.averagePurchaseAmount = 
    ((this.averagePurchaseAmount * (this.totalPurchases - 1)) + amount) / this.totalPurchases;
    
  return this.save();
};

// Pre-save middleware to update availablePurchaseAmount
StudentSchema.pre('save', function(next) {
  this.availablePurchaseAmount = Math.max(0, this.purchaseLimit - this.usedPurchaseAmount);
  this.updatedAt = new Date();
  next();
});

// Indexes for faster queries
StudentSchema.index({ email: 1 });
StudentSchema.index({ 'purchaseSettings.defaultShippingAddress': 1 });
StudentSchema.index({ usedPurchaseAmount: -1 });
StudentSchema.index({ totalPurchases: -1 });

module.exports = mongoose.model('Student', StudentSchema);
