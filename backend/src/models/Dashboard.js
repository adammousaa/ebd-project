const mongoose = require('mongoose');

const dashboardSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  widgets: {
    transactionSummary: {
      totalIncome: {
        type: Number,
        default: 0
      },
      totalExpense: {
        type: Number,
        default: 0
      },
      netBalance: {
        type: Number,
        default: 0
      },
      lastUpdated: {
        type: Date,
        default: Date.now
      }
    },
    creditOverview: {
      totalCredits: {
        type: Number,
        default: 0
      },
      usedCredits: {
        type: Number,
        default: 0
      },
      availableCredits: {
        type: Number,
        default: 0
      },
      percentage: {
        type: Number,
        default: 0
      }
    },
    courseProgress: {
      totalCourses: {
        type: Number,
        default: 0
      },
      completedCourses: {
        type: Number,
        default: 0
      },
      inProgressCourses: {
        type: Number,
        default: 0
      },
      averageProgress: {
        type: Number,
        default: 0
      }
    },
    recentActivity: [
      {
        type: {
          type: String,
          enum: ['transaction', 'course_completion', 'credit_update', 'recommendation'],
          required: true
        },
        title: String,
        description: String,
        timestamp: {
          type: Date,
          default: Date.now
        },
        icon: String
      }
    ]
  },
  metrics: {
    monthlySpending: [
      {
        month: String,
        amount: Number,
        category: String
      }
    ],
    creditTrend: [
      {
        date: Date,
        available: Number,
        used: Number
      }
    ],
    categoryBreakdown: [
      {
        category: String,
        amount: Number,
        percentage: Number
      }
    ]
  },
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'light'
    },
    widgetsOrder: [String],
    pinnedWidgets: [String],
    refreshInterval: {
      type: Number,
      default: 300000 // 5 minutes in milliseconds
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update updatedAt timestamp on save
dashboardSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Dashboard = mongoose.model('Dashboard', dashboardSchema);
module.exports = Dashboard;
