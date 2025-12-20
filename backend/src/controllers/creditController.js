const Credit = require("../models/credit");
const asyncHandler = require('express-async-handler');

// @desc    Generate carbon credits from emission reduction
// @route   POST /api/credits/generate
// @access  Public (can be made private later)
exports.generateCredits = asyncHandler(async (req, res) => {
  const { farmId, baselineEmission, actualEmission } = req.body;

  // Validate input
  if (!farmId || baselineEmission === undefined || actualEmission === undefined) {
    res.status(400);
    throw new Error('Farm ID, baseline emission, and actual emission are required');
  }

  if (baselineEmission < 0 || actualEmission < 0) {
    res.status(400);
    throw new Error('Emissions cannot be negative');
  }

  // Calculate credits generated (reduction in emissions)
  const creditsGenerated = Math.max(0, baselineEmission - actualEmission);

  // Create credit record
  const credit = await Credit.create({
    farmId,
    baselineEmission: parseFloat(baselineEmission),
    actualEmission: parseFloat(actualEmission),
    creditsGenerated,
    status: 'pending'
  });

  res.status(201).json({
    success: true,
    message: "Carbon credits generated successfully",
    credit
  });
});

// @desc    Get all carbon credits
// @route   GET /api/credits/all
// @access  Public (can be made private later)
exports.listCredits = asyncHandler(async (req, res) => {
  const { farmId, status } = req.query;
  
  let filter = {};
  if (farmId) filter.farmId = farmId;
  if (status) filter.status = status;

  const credits = await Credit.find(filter).sort({ createdAt: -1 });
  
  res.status(200).json({
    success: true,
    count: credits.length,
    data: credits
  });
});

// @desc    Get credit by ID
// @route   GET /api/credits/:id
// @access  Public
exports.getCreditById = asyncHandler(async (req, res) => {
  const credit = await Credit.findById(req.params.id);
  
  if (!credit) {
    res.status(404);
    throw new Error('Credit not found');
  }
  
  res.status(200).json({
    success: true,
    data: credit
  });
});

// @desc    Update credit status
// @route   PUT /api/credits/:id/status
// @access  Private/Admin
exports.updateCreditStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const validStatuses = ['pending', 'verified', 'sold'];
  
  if (!validStatuses.includes(status)) {
    res.status(400);
    throw new Error('Invalid status');
  }
  
  const credit = await Credit.findByIdAndUpdate(
    req.params.id,
    { 
      status,
      ...(status === 'verified' && { verificationDate: new Date() }),
      ...(status === 'sold' && { soldDate: new Date() })
    },
    { new: true, runValidators: true }
  );
  
  if (!credit) {
    res.status(404);
    throw new Error('Credit not found');
  }
  
  res.status(200).json({
    success: true,
    message: `Credit status updated to ${status}`,
    data: credit
  });
});
