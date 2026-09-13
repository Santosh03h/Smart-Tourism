const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

router.post('/generate-itinerary', aiController.generateItinerary);
router.post('/safety-analysis', aiController.safetyAnalysis);
router.post('/chat', aiController.chat);

module.exports = router;
