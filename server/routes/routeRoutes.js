const express = require('express');
const router = express.Router();
const routeController = require('../controllers/routeController');

router.post('/generate', routeController.generateRoutes);
router.get('/:tripId', routeController.getRoutesByTrip);

module.exports = router;
