const express = require('express');
const router = express.Router();
const passport = require('passport');
const parkingSpotController = require('./../controllers/parkingSpotController');

require('./../middleware/passport')(passport);

router.post('/parkingSpot', passport.authenticate('jwt', { session: false }), parkingSpotController.create);

router.get('/parkingSpot', passport.authenticate('jwt', { session: false }), parkingSpotController.listAll);

router.put('/parkingSpot/:spotId', passport.authenticate('jwt', { session: false }), parkingSpotController.update);

router.delete('/parkingSpot/:spotId', passport.authenticate('jwt', { session: false }), parkingSpotController.deleteSpot);

router.post('/parkingSpot/:spotId/assign/:userId', passport.authenticate('jwt', { session: false }), parkingSpotController.assignSpot);
router.post('/parkingSpot/:spotId/unassign/:userId', passport.authenticate('jwt', { session: false }), parkingSpotController.unassignSpot);

module.exports = router;
