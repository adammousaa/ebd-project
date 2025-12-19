const Farm = require('../models/Farm');
const asyncHandler = require('express-async-handler');

// @desc    Register a new farm
// @route   POST /api/farms/register
// @access  Public (or Private with auth later)
const registerFarm = asyncHandler(async (req, res) => {
  const {
    farmName,
    farmerName,
    email,
    phone,
    farmSize,
    farmType,
    address,
    latitude,
    longitude
  } = req.body;

  // Check if farm with same email already exists
  const farmExists = await Farm.findOne({ email });
  if (farmExists) {
    res.status(400);
    throw new Error('A farm with this email is already registered');
  }

  // Validate coordinates
  if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    res.status(400);
    throw new Error('Invalid coordinates provided');
  }

  // Create farm
  const farm = await Farm.create({
    farmName,
    farmerName,
    email,
    phone,
    farmSize: parseFloat(farmSize),
    farmType,
    address,
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude)
  });

  if (farm) {
    res.status(201).json({
      success: true,
      message: 'Farm registered successfully',
      data: {
        farmId: farm.farmId,
        farmName: farm.farmName,
        farmerName: farm.farmerName,
        email: farm.email,
        farmSize: farm.farmSize,
        farmType: farm.farmType,
        location: {
          latitude: farm.latitude,
          longitude: farm.longitude
        },
        status: farm.status,
        registrationDate: farm.registrationDate
      }
    });
  } else {
    res.status(400);
    throw new Error('Invalid farm data');
  }
});

// @desc    Get all farms
// @route   GET /api/farms
// @access  Public
const getFarms = asyncHandler(async (req, res) => {
  const farms = await Farm.find({}).select('-__v');
  
  res.status(200).json({
    success: true,
    count: farms.length,
    data: farms
  });
});

// @desc    Get farm by ID
// @route   GET /api/farms/:id
// @access  Public
const getFarmById = asyncHandler(async (req, res) => {
  const farm = await Farm.findOne({ farmId: req.params.id });
  
  if (!farm) {
    res.status(404);
    throw new Error('Farm not found');
  }
  
  res.status(200).json({
    success: true,
    data: farm
  });
});

// @desc    Get farms by location (within radius)
// @route   GET /api/farms/near/:lat/:lng/:radius
// @access  Public
const getFarmsNearLocation = asyncHandler(async (req, res) => {
  const { lat, lng, radius } = req.params;
  
  const farms = await Farm.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [parseFloat(lng), parseFloat(lat)]
        },
        $maxDistance: parseInt(radius) * 1000 // Convert km to meters
      }
    }
  });
  
  res.status(200).json({
    success: true,
    count: farms.length,
    data: farms
  });
});

// @desc    Update farm status
// @route   PUT /api/farms/:id/status
// @access  Private/Admin
const updateFarmStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const validStatuses = ['active', 'inactive', 'pending_verification'];
  
  if (!validStatuses.includes(status)) {
    res.status(400);
    throw new Error('Invalid status');
  }
  
  const farm = await Farm.findOneAndUpdate(
    { farmId: req.params.id },
    { status },
    { new: true, runValidators: true }
  );
  
  if (!farm) {
    res.status(404);
    throw new Error('Farm not found');
  }
  
  res.status(200).json({
    success: true,
    message: `Farm status updated to ${status}`,
    data: farm
  });
});

// @desc    Delete farm
// @route   DELETE /api/farms/:id
// @access  Private/Admin
const deleteFarm = asyncHandler(async (req, res) => {
  const farm = await Farm.findOneAndDelete({ farmId: req.params.id });
  
  if (!farm) {
    res.status(404);
    throw new Error('Farm not found');
  }
  
  res.status(200).json({
    success: true,
    message: 'Farm deleted successfully'
  });
});

module.exports = {
  registerFarm,
  getFarms,
  getFarmById,
  getFarmsNearLocation,
  updateFarmStatus,
  deleteFarm
};