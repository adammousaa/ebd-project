const Credit = require("../models/Credit");

exports.generateCredits = async (req, res) => {
  const { farmId, baselineEmission, actualEmission } = req.body;
  const creditsGenerated = Math.max(0, baselineEmission - actualEmission);

  const credit = await Credit.create({
    farmId,
    baselineEmission,
    actualEmission,
    creditsGenerated
  });

  res.status(201).json({
    message: "Carbon credits generated successfully",
    credit
  });
};

exports.listCredits = async (req, res) => {
  const credits = await Credit.find();
  res.json(credits);
};
