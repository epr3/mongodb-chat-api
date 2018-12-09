const passport = require('../config/passport');
const router = require('express').Router();
const authController = require('../controllers/auth.controller');

router.post('/register', authController.registerUser);
router.post('/login', passport.authenticate('local'), authController.loginUser);

module.exports = router;
