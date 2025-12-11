const express = require("express");
const router = express.Router();
const { generateCredits, listCredits } = require("../controllers/creditController");

router.post("/generate", generateCredits);
router.get("/all", listCredits);

module.exports = router;
