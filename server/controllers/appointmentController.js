const validator = require('validator');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Appointment = require('../models/appointmentModel');


exports.appointmentDetail = catchAsync(async (req, res, next) => {
    const {appointmentId} = req.body;

    const appointment = await Appointment.findById(appointmentId);

    if(!appointment){
        return next(new AppError(400, 'No appointment exists with that id'));
    }

    return res.status(200).json({
        sucess : true, 
        data : appointment
    })
});

exports.reschedule = catchAsync(async (req, res,next) => {
    const body = req.body;
    const user = req.user;
    const {appointment_id, reschedule_time} = body;
    const appointment = await Appointment.findById(appointment_id);
    if(!appointment){
        return next(new AppError(400, 'appointment does not exist'));
    }
    if(user._id !== appointment.hniId || user._id !== appointment.wmId){
        return next(new AppError(400, 'You are not associated with this appointment!'));
    }

    const newTime = new Date(reschedule_time).toISOString();
    appointment.scheduleTime = newTime;
    appointment.scheduleLog = [...appointment.scheduleLog, newTime];
    
    await appointment.save();

    return  res.status(200).json({
        success : true,
        data : `Appointment rescheduled succesfully`
    })
})