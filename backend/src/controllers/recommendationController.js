// backend/src/controllers/recommendationController.js
exports.getRecommendations = async (req, res) => {
  try {
    const studentId = req.params.id;

    // Hardcoded recommendations for demonstration
    const recommendations = [
      { title: "Reduce Fertilizer Usage", description: "Reduce nitrogen fertilizer usage by 10%." },
      { title: "Optimize Irrigation", description: "Switch to drip irrigation to reduce water waste." },
      { title: "Cover Crops", description: "Plant cover crops to improve soil carbon sequestration." }
    ];

    res.json({ student: studentId, recommendations });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
