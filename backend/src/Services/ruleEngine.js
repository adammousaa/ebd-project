function scoreCourseForStudent(student, course) {
  let score = 0;
  const reasons = [];

  // Skip already completed courses
  if (student.completedCourses && student.completedCourses.includes(course._id?.toString())) {
    return { course, score: -9999, reason: 'already completed' };
  }

  // Match student interests with course tags
  const matchedTags = (course.tags || []).filter(tag => (student.interests || []).includes(tag.toLowerCase()));
  if (matchedTags.length) {
    score += 30 * matchedTags.length;
    reasons.push(`matches interests: ${matchedTags.join(', ')}`);
  }

  // Year recommendation
  if ((course.recommendedForYears || []).includes(student.year)) {
    score += 20;
    reasons.push(`recommended for ${student.year}`);
  }

  // GPA bonus
  if (student.gpa >= 3.5 && course.difficulty !== 'advanced') {
    score += 10;
    reasons.push('high GPA fit');
  }

  // Intro-level bonus for early-year students
  if (['freshman','sophomore'].includes(student.year) && course.difficulty === 'intro') {
    score += 5;
    reasons.push('intro-level for early year');
  }

  if (score === 0) reasons.push('no strong match');

  return { course, score, reason: reasons.join('; ') };
}

function generateRecommendations(student, courses, { limit = 5 } = {}) {
  const scored = courses.map(c => scoreCourseForStudent(student, c));
  const filtered = scored.filter(s => s.score > -1000);
  filtered.sort((a, b) => b.score - a.score);
  return filtered.slice(0, limit);
}

module.exports = { generateRecommendations };
