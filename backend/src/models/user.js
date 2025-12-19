const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Don't return password by default
  },
  role: {
    type: String,
    enum: ['student', 'admin', 'company', 'user'], // Added all roles
    default: 'student' // Changed from 'user' to 'student' for your EBD project
  },
  isActive: {
    type: Boolean,
    default: true
  },
  profile: {
    name: {
      type: String,
      default: ''
    },
    avatar: {
      type: String,
      default: ''
    },
    phone: {
      type: String,
      default: ''
    },
    address: {
      type: String,
      default: ''
    }
  },
  lastLogin: {
    type: Date
  },
  loginCount: {
    type: Number,
    default: 0
  },
  settings: {
    notifications: {
      email: { type: Boolean, default: true },
      purchaseUpdates: { type: Boolean, default: true },
      creditAlerts: { type: Boolean, default: true }
    },
    theme: {
      type: String,
      enum: ['light', 'dark', 'auto'],
      default: 'light'
    }
  },
  // Link to Student model if role is 'student'
  studentProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  },
  // Link to Company model if role is 'company'
  companyProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company'
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
  timestamps: true, // Automatically manages createdAt and updatedAt
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// ========== VIRTUAL PROPERTIES ==========
userSchema.virtual('fullName').get(function() {
  return this.profile.name || this.username;
});

userSchema.virtual('isAdmin').get(function() {
  return this.role === 'admin';
});

userSchema.virtual('isStudent').get(function() {
  return this.role === 'student';
});

userSchema.virtual('isCompany').get(function() {
  return this.role === 'company';
});

// ========== MIDDLEWARE ==========
// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Update updatedAt on save
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  
  // Ensure profile.name is set if empty
  if (!this.profile.name && this.username) {
    this.profile.name = this.username;
  }
  
  next();
});

// ========== INSTANCE METHODS ==========
// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Update last login
userSchema.methods.updateLastLogin = async function() {
  this.lastLogin = new Date();
  this.loginCount += 1;
  return this.save();
};

// Get user summary (safe data for API responses)
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  delete user.__v;
  return user;
};

// Check if user can perform admin actions
userSchema.methods.canManageUsers = function() {
  return this.role === 'admin';
};

userSchema.methods.canApprovePurchases = function() {
  return this.role === 'admin' || this.role === 'company';
};

// ========== STATIC METHODS ==========
// Find user by email (including password for auth)
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email }).select('+password');
};

// Find all active users
userSchema.statics.findActiveUsers = function() {
  return this.find({ isActive: true });
};

// Find users by role
userSchema.statics.findByRole = function(role) {
  return this.find({ role, isActive: true });
};

// Get user statistics
userSchema.statics.getUserStats = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: '$role',
        count: { $sum: 1 },
        activeCount: {
          $sum: { $cond: ['$isActive', 1, 0] }
        }
      }
    },
    {
      $project: {
        role: '$_id',
        count: 1,
        activeCount: 1,
        _id: 0
      }
    }
  ]);
  
  const total = await this.countDocuments();
  const activeTotal = await this.countDocuments({ isActive: true });
  
  return {
    byRole: stats,
    total,
    activeTotal
  };
};

// ========== INDEXES ==========
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ username: 1 }, { unique: true });
userSchema.index({ role: 1, isActive: 1 });
userSchema.index({ 'profile.name': 1 });
userSchema.index({ createdAt: -1 });
userSchema.index({ lastLogin: -1 });

const User = mongoose.model('User', userSchema);
module.exports = User;