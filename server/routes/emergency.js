const express = require('express');
const router = express.Router();
const emergencyController = require('../controllers/emergencyController');

router.post('/sos', emergencyController.triggerSOS);
router.get('/nearby', emergencyController.getNearbyServices);
router.get('/logs', emergencyController.getEmergencyLogs);

module.exports = router;
