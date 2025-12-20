const express = require("express");
const router = express.Router();
const { 
  generateCredits, 
  listCredits, 
  getCreditById,
  updateCreditStatus 
} = require("../controllers/creditController");

// POST /api/credits/generate
router.post("/generate", generateCredits);

// GET /api/credits/all
router.get("/all", listCredits);

// GET /api/credits/:id
router.get("/:id", getCreditById);

// PUT /api/credits/:id/status (for admin)
router.put("/:id/status", updateCreditStatus);

module.exports = router;
