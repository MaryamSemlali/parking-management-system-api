const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('./../controllers/usersController');

require('./../middleware/passport')(passport);

router.post('/register', usersController.register);
router.post('/login', usersController.login);

router.get('/users/me', passport.authenticate('jwt', { session: false }), usersController.listUser);

router.put('/users/:userId', passport.authenticate('jwt', { session: false }), usersController.updateUser);

module.exports = router;
