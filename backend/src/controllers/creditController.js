const { simulateCreditGeneration } = require("../services/creditService");
const { saveCreditRecord, getAllCreditRecords } = require("../models/creditModel");


function generateCredits(req, res) {
  const { emissions } = req.body;

  if (emissions === undefined) {
    return res.status(400).json({ error: "Emissions value is required" });
  }

  const credits = simulateCreditGeneration(emissions);

  const record = {
    id: Date.now(),
    emissions,
    credits,
    timestamp: new Date()
  };

  saveCreditRecord(record);

  res.json({
    message: "Carbon credits generated",
    data: record
  });
}


function listCredits(req, res) {
  res.json(getAllCreditRecords());
}

module.exports = { generateCredits, listCredits };
