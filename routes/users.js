const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('./../controllers/usersController');

require('./../middleware/passport')(passport);

router.post('/register', usersController.register);
router.post('/login', usersController.login);

router.get('/users/me', passport.authenticate('jwt', { session: false }), usersController.listUser);
router.get('/users', passport.authenticate('jwt', { session: false }), usersController.listAllUsers);

router.put('/users/:userId', passport.authenticate('jwt', { session: false }), usersController.updateUser);
router.put('/users', passport.authenticate('jwt', { session: false }), usersController.updateConnectedUser);

module.exports = router;
