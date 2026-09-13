const express = require('express');
const router = express.Router();
const riskController = require('../controllers/riskController');

router.post('/analyze', riskController.analyzeRisk);
router.get('/:location', riskController.getRiskByLocation);

module.exports = router;
