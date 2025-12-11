const express = require('express');
const router = express.Router();
const { getRecommendations } = require('../controllers/recommendationController');

// GET recommendations for a student by ID
router.get('/student/:id', getRecommendations);

module.exports = router;

