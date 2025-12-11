const express = require('express');
const router = express.Router();
const {
  getDashboard,
  updateDashboardPreferences,
  getTransactionSummary,
  getMonthlySpendings,
  getRecentActivity,
  addActivity,
  getDashboardOverview
} = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');

// All routes are protected - require authentication
router.use(protect);

// Main dashboard routes
router.route('/')
  .get(getDashboard);

router.route('/overview')
  .get(getDashboardOverview);

router.route('/preferences')
  .put(updateDashboardPreferences);

// Summary and analytics routes
router.route('/summary/transactions')
  .get(getTransactionSummary);

router.route('/trends/monthly-spending')
  .get(getMonthlySpendings);

// Activity routes
router.route('/activity/recent')
  .get(getRecentActivity);

router.route('/activity')
  .post(addActivity);

module.exports = router;
