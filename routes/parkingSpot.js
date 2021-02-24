const express = require('express');
const router = express.Router();
const passport = require('passport');
const parkingSpotController = require('./../controllers/parkingSpotController');

require('./../middleware/passport')(passport);

router.post('/parkingSpot', passport.authenticate('jwt', { session: false }), parkingSpotController.create);

router.get('/parkingSpot', passport.authenticate('jwt', { session: false }), parkingSpotController.listAll);

module.exports = router;
