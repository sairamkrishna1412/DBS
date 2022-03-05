const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

const passport = require('passport');
require('../services/passport');

router.post(
  '/signup',
  passport.authenticate('local', { failureMessage: 'Could not signup!' }),
  authController.signup
);

router.post(
  '/login',
  passport.authenticate('local', { failureMessage: 'Incorrect credentials!' }),
  authController.login
);

router.get('/logout', authController.logout);

module.exports = router;
