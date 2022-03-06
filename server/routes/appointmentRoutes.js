const express = require('express');
const appointmentController = require('../controllers/appointmentController');
const { isAuth } = require('../middleware/middleware');
const router = express.Router();

router.get('/:id', isAuth, appointmentController.appointmentDetail);
router.post('/newAppointment', isAuth, appointmentController.newAppointment);
router.post('/respond', isAuth , appointmentController.respond);
router.post('/reschedule', isAuth, appointmentController.reschedule);

module.exports = router;
