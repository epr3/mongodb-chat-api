const passport = require('../config/passport');
const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.get('/users', passport.authenticate('jwt'), userController.getUsers);
router.get('/users/me', passport.authenticate('jwt'), userController.getUser);

module.exports = router;
