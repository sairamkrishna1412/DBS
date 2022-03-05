const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

const passport = require('passport');
require('../services/passport');


router.get('/logout', authController.logout);

module.exports = router;
