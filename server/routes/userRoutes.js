const express = require('express');
const userController = require('../controllers/userController');
const isAuth = require('../middleware/middleware');
const router = express.Router();

// end points here
router.get('dashboard', userController.dashboard);


module.exports = router;