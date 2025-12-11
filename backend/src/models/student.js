const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  year: { type: String, enum: ['freshman','sophomore','junior','senior','grad'], default: 'freshman' },
  interests: [{ type: String }],
  gpa: { type: Number, min: 0, max: 4.0 },
  completedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Student', StudentSchema);

