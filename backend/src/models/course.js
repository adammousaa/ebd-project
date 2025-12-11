const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String },
  tags: [{ type: String }],
  difficulty: { type: String, enum: ['intro','intermediate','advanced'], default: 'intro' },
  recommendedForYears: [{ type: String, enum: ['freshman','sophomore','junior','senior','grad'] }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', CourseSchema);
