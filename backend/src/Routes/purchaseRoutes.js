const express = require('express');
const router = express.Router();
const {
    createPurchaseRequest,
    getAllPurchaseRequests,
    getMyPurchaseRequests,
    getPurchaseRequestById,
    approvePurchaseRequest,
    rejectPurchaseRequest,
    cancelPurchaseRequest,
    getPurchaseStats
} = require('../controllers/purchaseController');
const { protect, admin } = require('../middleware/authMiddleware');

// All routes are protected (require authentication)
router.use(protect);

// =========== STUDENT ROUTES ===========
// Create a new purchase request (students only)
router.post('/', createPurchaseRequest);

// Get student's own purchase requests
router.get('/my-requests', getMyPurchaseRequests);

// Get specific purchase request (students can see their own)
router.get('/:id', getPurchaseRequestById);

// Cancel a pending purchase request (student can cancel their own)
router.put('/:id/cancel', cancelPurchaseRequest);

// =========== ADMIN ROUTES ===========
// Get all purchase requests (admin only)
router.get('/', admin, getAllPurchaseRequests);

// Approve a purchase request (admin only)
router.put('/:id/approve', admin, approvePurchaseRequest);

// Reject a purchase request (admin only)
router.put('/:id/reject', admin, rejectPurchaseRequest);

// Get purchase statistics (admin only)
router.get('/stats/overview', admin, getPurchaseStats);

module.exports = router;