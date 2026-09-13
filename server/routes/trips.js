const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');
const { protect } = require('../middleware/auth');

router.use(protect);
router.route('/')
  .post(tripController.createTrip)
  .get(tripController.getTrips);

router.route('/:id')
  .get(tripController.getTrip)
  .put(tripController.updateTrip)
  .delete(tripController.deleteTrip);

module.exports = router;
