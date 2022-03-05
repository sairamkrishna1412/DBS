const express = require('express');
const appointmentController = require('../controllers/appointmentController');
const router = express.Router();

router.get('/:id', appointmentController.appointmentDetail);

router.post('/reschedule', appointmentController.reschedule);

module.exports = router;