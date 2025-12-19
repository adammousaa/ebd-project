const express = require('express');
const router = express.Router();
const {
    getSystemStats,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getAllStudents,
    getSystemActivity
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

// All admin routes require both protection and admin role
router.use(protect, admin);

// System statistics
router.get('/stats', getSystemStats);

// User management
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Student management
router.get('/students', getAllStudents);

// System activity
router.get('/activity', getSystemActivity);

module.exports = router;