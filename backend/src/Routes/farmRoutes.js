const express = require('express');
const router = express.Router();
const {
  registerFarm,
  getFarms,
  getFarmById,
  getFarmsNearLocation,
  updateFarmStatus,
  deleteFarm
} = require('../controllers/farmController');

// Public routes
router.post('/register', registerFarm);
router.get('/', getFarms);
router.get('/:id', getFarmById);
router.get('/near/:lat/:lng/:radius', getFarmsNearLocation);

// Protected/Admin routes (add middleware later if needed)
router.put('/:id/status', updateFarmStatus);
router.delete('/:id', deleteFarm);

module.exports = router;