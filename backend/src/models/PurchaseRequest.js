const mongoose = require('mongoose');

const PurchaseRequestSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    items: [{
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
        pricePerUnit: {
            type: Number,
            required: true
        }
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'cancelled'],
        default: 'pending'
    },
    reasonForRejection: {
        type: String,
        default: ''
    },
    requestedAt: {
        type: Date,
        default: Date.now
    },
    reviewedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reviewedAt: {
        type: Date
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    notes: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

// Add indexes for faster queries
PurchaseRequestSchema.index({ studentId: 1, status: 1 });
PurchaseRequestSchema.index({ companyId: 1, status: 1 });
PurchaseRequestSchema.index({ requestedAt: -1 });

module.exports = mongoose.model('PurchaseRequest', PurchaseRequestSchema);