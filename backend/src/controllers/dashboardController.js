const Dashboard = require('../models/Dashboard');
const Transaction = require('../models/Transaction');

// @desc    Get or create user dashboard
// @route   GET /api/dashboard
// @access  Private
const getDashboard = async (req, res) => {
  try {
    let dashboard = await Dashboard.findOne({ user: req.user._id });

    // If dashboard doesn't exist, create it
    if (!dashboard) {
      dashboard = await Dashboard.create({
        user: req.user._id,
        widgets: {
          transactionSummary: {
            totalIncome: 0,
            totalExpense: 0,
            netBalance: 0
          },
          creditOverview: {
            totalCredits: 0,
            usedCredits: 0,
            availableCredits: 0,
            percentage: 0
          },
          courseProgress: {
            totalCourses: 0,
            completedCourses: 0,
            inProgressCourses: 0,
            averageProgress: 0
          },
          recentActivity: []
        }
      });
    }

    // Recalculate transaction summary
    dashboard = await updateTransactionSummary(dashboard);

    res.json(dashboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update dashboard widget preferences
// @route   PUT /api/dashboard/preferences
// @access  Private
const updateDashboardPreferences = async (req, res) => {
  try {
    const { theme, widgetsOrder, pinnedWidgets, refreshInterval } = req.body;

    let dashboard = await Dashboard.findOne({ user: req.user._id });

    if (!dashboard) {
      return res.status(404).json({ message: 'Dashboard not found' });
    }

    if (theme) dashboard.preferences.theme = theme;
    if (widgetsOrder) dashboard.preferences.widgetsOrder = widgetsOrder;
    if (pinnedWidgets) dashboard.preferences.pinnedWidgets = pinnedWidgets;
    if (refreshInterval) dashboard.preferences.refreshInterval = refreshInterval;

    await dashboard.save();
    res.json(dashboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get transaction summary for dashboard
// @route   GET /api/dashboard/summary/transactions
// @access  Private
const getTransactionSummary = async (req, res) => {
  try {
    const { period = 'month' } = req.query; // 'week', 'month', 'year'

    let startDate = new Date();
    
    if (period === 'week') {
      startDate.setDate(startDate.getDate() - 7);
    } else if (period === 'month') {
      startDate.setMonth(startDate.getMonth() - 1);
    } else if (period === 'year') {
      startDate.setFullYear(startDate.getFullYear() - 1);
    }

    const transactions = await Transaction.find({
      user: req.user._id,
      date: { $gte: startDate }
    });

    let totalIncome = 0;
    let totalExpense = 0;
    const categoryBreakdown = {};

    transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        totalIncome += transaction.amount;
      } else {
        totalExpense += transaction.amount;
        categoryBreakdown[transaction.category] = 
          (categoryBreakdown[transaction.category] || 0) + transaction.amount;
      }
    });

    const netBalance = totalIncome - totalExpense;

    // Convert category breakdown to array
    const categoryArray = Object.entries(categoryBreakdown).map(([category, amount]) => ({
      category,
      amount,
      percentage: totalExpense > 0 ? ((amount / totalExpense) * 100).toFixed(2) : 0
    }));

    res.json({
      period,
      totalIncome,
      totalExpense,
      netBalance,
      categoryBreakdown: categoryArray,
      transactionCount: transactions.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get monthly spending trend
// @route   GET /api/dashboard/trends/monthly-spending
// @access  Private
const getMonthlySpendings = async (req, res) => {
  try {
    const months = 12;
    const monthlyData = [];

    for (let i = months - 1; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const year = date.getFullYear();
      const month = date.getMonth();

      const startDate = new Date(year, month, 1);
      const endDate = new Date(year, month + 1, 0);

      const transactions = await Transaction.find({
        user: req.user._id,
        type: 'expense',
        date: { $gte: startDate, $lte: endDate }
      });

      const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);

      monthlyData.push({
        month: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        amount: totalAmount,
        transactionCount: transactions.length
      });
    }

    res.json(monthlyData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get recent activity
// @route   GET /api/dashboard/activity/recent
// @access  Private
const getRecentActivity = async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const dashboard = await Dashboard.findOne({ user: req.user._id });

    if (!dashboard) {
      return res.status(404).json({ message: 'Dashboard not found' });
    }

    // Get recent transactions
    const recentTransactions = await Transaction.find({ user: req.user._id })
      .sort({ date: -1 })
      .limit(parseInt(limit));

    // Map transactions to activity format
    const activities = recentTransactions.map(transaction => ({
      type: 'transaction',
      title: `${transaction.type.toUpperCase()}: ${transaction.category}`,
      description: `Amount: $${transaction.amount.toFixed(2)}`,
      timestamp: transaction.date,
      icon: transaction.type === 'income' ? 'arrow-up' : 'arrow-down'
    }));

    // Combine with dashboard recent activity and sort
    const allActivities = [...activities, ...dashboard.widgets.recentActivity]
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, parseInt(limit));

    res.json(allActivities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add activity to dashboard
// @route   POST /api/dashboard/activity
// @access  Private
const addActivity = async (req, res) => {
  try {
    const { type, title, description, icon } = req.body;

    const dashboard = await Dashboard.findOne({ user: req.user._id });

    if (!dashboard) {
      return res.status(404).json({ message: 'Dashboard not found' });
    }

    dashboard.widgets.recentActivity.unshift({
      type,
      title,
      description,
      icon,
      timestamp: Date.now()
    });

    // Keep only last 50 activities
    if (dashboard.widgets.recentActivity.length > 50) {
      dashboard.widgets.recentActivity = dashboard.widgets.recentActivity.slice(0, 50);
    }

    await dashboard.save();
    res.status(201).json(dashboard.widgets.recentActivity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Helper function to update transaction summary
const updateTransactionSummary = async (dashboard) => {
  try {
    const transactions = await Transaction.find({ user: dashboard.user });

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        totalIncome += transaction.amount;
      } else {
        totalExpense += transaction.amount;
      }
    });

    dashboard.widgets.transactionSummary = {
      totalIncome,
      totalExpense,
      netBalance: totalIncome - totalExpense,
      lastUpdated: Date.now()
    };

    await dashboard.save();
    return dashboard;
  } catch (error) {
    console.error('Error updating transaction summary:', error);
    return dashboard;
  }
};

// @desc    Get dashboard overview (all key metrics)
// @route   GET /api/dashboard/overview
// @access  Private
const getDashboardOverview = async (req, res) => {
  try {
    const dashboard = await Dashboard.findOne({ user: req.user._id });

    if (!dashboard) {
      return res.status(404).json({ message: 'Dashboard not found' });
    }

    // Get last 30 days transactions
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentTransactions = await Transaction.find({
      user: req.user._id,
      date: { $gte: thirtyDaysAgo }
    });

    const overview = {
      transactionSummary: dashboard.widgets.transactionSummary,
      creditOverview: dashboard.widgets.creditOverview,
      courseProgress: dashboard.widgets.courseProgress,
      recentTransactions: recentTransactions.slice(0, 5),
      preferences: dashboard.preferences
    };

    res.json(overview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDashboard,
  updateDashboardPreferences,
  getTransactionSummary,
  getMonthlySpendings,
  getRecentActivity,
  addActivity,
  getDashboardOverview
};
