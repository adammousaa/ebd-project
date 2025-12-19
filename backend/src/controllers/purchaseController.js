const PurchaseRequest = require('../models/PurchaseRequest');
const Student = require('../models/student');
const Transaction = require('../models/Transaction');
const User = require('../models/user');

// @desc    Create a purchase request
// @route   POST /api/purchase-requests
// @access  Private (Student)
exports.createPurchaseRequest = async (req, res) => {
    try {
        const { items, companyId, notes } = req.body;
        const studentId = req.user.id; // Assuming auth middleware sets req.user

        // Calculate total amount
        const totalAmount = items.reduce((sum, item) => 
            sum + (item.pricePerUnit * item.quantity), 0);

        // Check student's purchase limit
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        if (student.usedPurchaseAmount + totalAmount > student.purchaseLimit) {
            return res.status(400).json({ 
                message: 'Purchase exceeds your available limit',
                available: student.purchaseLimit - student.usedPurchaseAmount,
                requested: totalAmount
            });
        }

        // Create purchase request
        const purchaseRequest = new PurchaseRequest({
            studentId,
            items,
            totalAmount,
            companyId,
            notes,
            status: 'pending'
        });

        const savedRequest = await purchaseRequest.save();

        // Update student's purchase request count
        await Student.findByIdAndUpdate(studentId, {
            $inc: { purchaseRequestsCount: 1 }
        });

        res.status(201).json({
            success: true,
            data: savedRequest,
            message: 'Purchase request submitted successfully'
        });

    } catch (error) {
        console.error('Create purchase request error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error', 
            error: error.message 
        });
    }
};

// @desc    Get all purchase requests (for admin/company)
// @route   GET /api/purchase-requests
// @access  Private (Admin/Company)
exports.getAllPurchaseRequests = async (req, res) => {
    try {
        const { status, studentId, companyId, page = 1, limit = 10 } = req.query;
        
        let filter = {};
        
        // Apply filters if provided
        if (status) filter.status = status;
        if (studentId) filter.studentId = studentId;
        if (companyId) filter.companyId = companyId;

        // Pagination
        const skip = (page - 1) * limit;

        const purchaseRequests = await PurchaseRequest.find(filter)
            .populate('studentId', 'name email')
            .populate('companyId', 'companyName')
            .populate('reviewedBy', 'name email')
            .sort({ requestedAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await PurchaseRequest.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: purchaseRequests,
            pagination: {
                total,
                page: parseInt(page),
                pages: Math.ceil(total / limit),
                limit: parseInt(limit)
            }
        });

    } catch (error) {
        console.error('Get purchase requests error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error', 
            error: error.message 
        });
    }
};

// @desc    Get purchase requests for a specific student
// @route   GET /api/purchase-requests/my-requests
// @access  Private (Student)
exports.getMyPurchaseRequests = async (req, res) => {
    try {
        const studentId = req.user.id;
        const { status } = req.query;
        
        let filter = { studentId };
        if (status) filter.status = status;

        const purchaseRequests = await PurchaseRequest.find(filter)
            .populate('companyId', 'companyName')
            .populate('reviewedBy', 'name')
            .sort({ requestedAt: -1 });

        res.status(200).json({
            success: true,
            data: purchaseRequests,
            count: purchaseRequests.length
        });

    } catch (error) {
        console.error('Get my purchase requests error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error', 
            error: error.message 
        });
    }
};

// @desc    Get single purchase request
// @route   GET /api/purchase-requests/:id
// @access  Private
exports.getPurchaseRequestById = async (req, res) => {
    try {
        const purchaseRequest = await PurchaseRequest.findById(req.params.id)
            .populate('studentId', 'name email')
            .populate('companyId', 'companyName address')
            .populate('reviewedBy', 'name email');

        if (!purchaseRequest) {
            return res.status(404).json({ 
                success: false, 
                message: 'Purchase request not found' 
            });
        }

        // Check authorization (student can only see their own, admin/company can see all)
        if (req.user.role === 'student' && purchaseRequest.studentId._id.toString() !== req.user.id) {
            return res.status(403).json({ 
                success: false, 
                message: 'Not authorized to view this request' 
            });
        }

        res.status(200).json({
            success: true,
            data: purchaseRequest
        });

    } catch (error) {
        console.error('Get purchase request error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error', 
            error: error.message 
        });
    }
};

// @desc    Approve a purchase request
// @route   PUT /api/purchase-requests/:id/approve
// @access  Private (Admin/Company)
exports.approvePurchaseRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const reviewerId = req.user.id;

        const purchaseRequest = await PurchaseRequest.findById(id);
        
        if (!purchaseRequest) {
            return res.status(404).json({ 
                success: false, 
                message: 'Purchase request not found' 
            });
        }

        if (purchaseRequest.status !== 'pending') {
            return res.status(400).json({ 
                success: false, 
                message: `Purchase request is already ${purchaseRequest.status}` 
            });
        }

        // Update purchase request
        purchaseRequest.status = 'approved';
        purchaseRequest.reviewedBy = reviewerId;
        purchaseRequest.reviewedAt = new Date();
        
        const updatedRequest = await purchaseRequest.save();

        // Update student's purchase stats
        await Student.findByIdAndUpdate(purchaseRequest.studentId, {
            $inc: { 
                totalPurchases: 1,
                usedPurchaseAmount: purchaseRequest.totalAmount
            },
            lastPurchaseDate: new Date()
        });

        // Create a transaction record
        const transaction = new Transaction({
            studentId: purchaseRequest.studentId,
            amount: purchaseRequest.totalAmount,
            type: 'purchase',
            description: `Purchase approved: ${purchaseRequest.items.map(i => i.name).join(', ')}`,
            status: 'completed',
            reference: `PR-${id}`
        });
        await transaction.save();

        res.status(200).json({
            success: true,
            data: updatedRequest,
            message: 'Purchase request approved successfully'
        });

    } catch (error) {
        console.error('Approve purchase request error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error', 
            error: error.message 
        });
    }
};

// @desc    Reject a purchase request
// @route   PUT /api/purchase-requests/:id/reject
// @access  Private (Admin/Company)
exports.rejectPurchaseRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const { reason } = req.body;
        const reviewerId = req.user.id;

        if (!reason || reason.trim() === '') {
            return res.status(400).json({ 
                success: false, 
                message: 'Reason for rejection is required' 
            });
        }

        const purchaseRequest = await PurchaseRequest.findById(id);
        
        if (!purchaseRequest) {
            return res.status(404).json({ 
                success: false, 
                message: 'Purchase request not found' 
            });
        }

        if (purchaseRequest.status !== 'pending') {
            return res.status(400).json({ 
                success: false, 
                message: `Purchase request is already ${purchaseRequest.status}` 
            });
        }

        // Update purchase request
        purchaseRequest.status = 'rejected';
        purchaseRequest.reasonForRejection = reason;
        purchaseRequest.reviewedBy = reviewerId;
        purchaseRequest.reviewedAt = new Date();
        
        const updatedRequest = await purchaseRequest.save();

        res.status(200).json({
            success: true,
            data: updatedRequest,
            message: 'Purchase request rejected'
        });

    } catch (error) {
        console.error('Reject purchase request error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error', 
            error: error.message 
        });
    }
};

// @desc    Cancel a purchase request (student can cancel pending requests)
// @route   PUT /api/purchase-requests/:id/cancel
// @access  Private (Student)
exports.cancelPurchaseRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const studentId = req.user.id;

        const purchaseRequest = await PurchaseRequest.findById(id);
        
        if (!purchaseRequest) {
            return res.status(404).json({ 
                success: false, 
                message: 'Purchase request not found' 
            });
        }

        // Check if student owns this request
        if (purchaseRequest.studentId.toString() !== studentId) {
            return res.status(403).json({ 
                success: false, 
                message: 'Not authorized to cancel this request' 
            });
        }

        if (purchaseRequest.status !== 'pending') {
            return res.status(400).json({ 
                success: false, 
                message: `Cannot cancel a ${purchaseRequest.status} request` 
            });
        }

        // Update purchase request
        purchaseRequest.status = 'cancelled';
        purchaseRequest.reviewedAt = new Date();
        
        const updatedRequest = await purchaseRequest.save();

        res.status(200).json({
            success: true,
            data: updatedRequest,
            message: 'Purchase request cancelled successfully'
        });

    } catch (error) {
        console.error('Cancel purchase request error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error', 
            error: error.message 
        });
    }
};

// @desc    Get purchase statistics
// @route   GET /api/purchase-requests/stats
// @access  Private (Admin)
exports.getPurchaseStats = async (req, res) => {
    try {
        // Count by status
        const statusCounts = await PurchaseRequest.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);

        // Total purchase amount
        const totalAmount = await PurchaseRequest.aggregate([
            { $match: { status: 'approved' } },
            { $group: { _id: null, total: { $sum: '$totalAmount' } } }
        ]);

        // Recent purchases (last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const recentPurchases = await PurchaseRequest.countDocuments({
            status: 'approved',
            requestedAt: { $gte: thirtyDaysAgo }
        });

        res.status(200).json({
            success: true,
            data: {
                statusCounts,
                totalAmount: totalAmount[0]?.total || 0,
                recentPurchases,
                pendingCount: statusCounts.find(s => s._id === 'pending')?.count || 0
            }
        });

    } catch (error) {
        console.error('Get purchase stats error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error', 
            error: error.message 
        });
    }
};