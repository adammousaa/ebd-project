const express = require("express");
const router = express.Router();
const { generateCredits, listCredits } = require("../controllers/creditController");

// POST /api/credits/generate
router.post("/generate", generateCredits);

// GET /api/credits/all
router.get("/all", listCredits);

module.exports = router;
