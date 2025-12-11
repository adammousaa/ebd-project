const Student = require('../models/Student');
const Course = require('../models/Course');
const { generateRecommendations } = require('../services/ruleEngine');

exports.getRecommendations = async (req, res) => {
  try {
    // Find student by ID from URL parameter
    const student = await Student.findById(req.params.id).lean();
    if (!student) return res.status(404).json({ error: 'Student not found' });

    // Get all courses
    const courses = await Course.find().lean();

    // Generate recommendations using rule-based engine
    const recommendations = generateRecommendations(student, courses, { limit: 5 });

    res.json({ student: student._id, recommendations });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

