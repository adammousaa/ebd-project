const User = require('../models/user');
const Student = require('../models/student');
const PurchaseRequest = require('../models/PurchaseRequest');
const Transaction = require('../models/Transaction');

// @desc    Get system statistics (admin only)
// @route   GET /api/admin/stats
// @access  Private/Admin
exports.getSystemStats = async (req, res) => {
    try {
        // Get counts from all collections
        const [
            userCount,
            studentCount,
            purchaseCount,
            transactionCount
        ] = await Promise.all([
            User.countDocuments(),
            Student.countDocuments(),
            PurchaseRequest.countDocuments(),
            Transaction.countDocuments()
        ]);

        // Get purchase stats by status
        const purchaseStats = await PurchaseRequest.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 },
                    totalAmount: { $sum: '$totalAmount' }
                }
            }
        ]);

        // Get recent users
        const recentUsers = await User.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('-password');

        res.status(200).json({
            success: true,
            data: {
                counts: {
                    users: userCount,
                    students: studentCount,
                    purchases: purchaseCount,
                    transactions: transactionCount
                },
                purchaseStats,
                recentUsers,
                serverTime: new Date()
            }
        });

    } catch (error) {
        console.error('Get system stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Get all users (admin only)
// @route   GET /api/admin/users
// @access  Private/Admin
exports.getAllUsers = async (req, res) => {
    try {
        const { page = 1, limit = 20, role } = req.query;
        const skip = (page - 1) * limit;

        let filter = {};
        if (role) filter.role = role;

        const users = await User.find(filter)
            .select('-password')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await User.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: users,
            pagination: {
                total,
                page: parseInt(page),
                pages: Math.ceil(total / limit),
                limit: parseInt(limit)
            }
        });

    } catch (error) {
        console.error('Get all users error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Get user by ID (admin only)
// @route   GET /api/admin/users/:id
// @access  Private/Admin
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });

    } catch (error) {
        console.error('Get user by ID error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Update user (admin only)
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
exports.updateUser = async (req, res) => {
    try {
        const { role, isActive, ...otherData } = req.body;
        
        const updateData = {};
        if (role) updateData.role = role;
        if (typeof isActive !== 'undefined') updateData.isActive = isActive;

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { ...updateData, ...otherData },
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            data: user,
            message: 'User updated successfully'
        });

    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Delete user (admin only)
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        });

    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Get all students (admin only)
// @route   GET /api/admin/students
// @access  Private/Admin
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find()
            .populate('completedCourses')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: students,
            count: students.length
        });

    } catch (error) {
        console.error('Get all students error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Get system logs/activity (simulated)
// @route   GET /api/admin/activity
// @access  Private/Admin
exports.getSystemActivity = async (req, res) => {
    try {
        // Get recent purchases
        const recentPurchases = await PurchaseRequest.find()
            .populate('studentId', 'name email')
            .sort({ requestedAt: -1 })
            .limit(10);

        // Get recent transactions
        const recentTransactions = await Transaction.find()
            .populate('studentId', 'name email')
            .sort({ createdAt: -1 })
            .limit(10);

        // Combine and sort by date
        const activity = [
            ...recentPurchases.map(p => ({
                type: 'purchase',
                action: `Purchase request ${p.status}`,
                user: p.studentId?.name || 'Unknown',
                details: `${p.items.length} item(s) - $${p.totalAmount}`,
                timestamp: p.requestedAt
            })),
            ...recentTransactions.map(t => ({
                type: 'transaction',
                action: `Transaction ${t.status}`,
                user: t.studentId?.name || 'Unknown',
                details: `${t.type} - $${t.amount}`,
                timestamp: t.createdAt
            }))
        ].sort((a, b) => b.timestamp - a.timestamp)
         .slice(0, 20);

        res.status(200).json({
            success: true,
            data: activity
        });

    } catch (error) {
        console.error('Get system activity error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};