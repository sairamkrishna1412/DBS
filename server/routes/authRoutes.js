const express = require('express');
const authController = require('../controllers/authController');
const AppError = require('../utils/appError');
const router = express.Router();

const passport = require('passport');
require('../services/passport');

router.post('/signup', passport.authenticate('local'), authController.signup);

router.post('/login', passport.authenticate('local'), authController.login);

router.get('/logout', authController.logout);

module.exports = router;
