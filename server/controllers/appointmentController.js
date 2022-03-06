const validator = require('validator');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Appointment = require('../models/appointmentModel');
const User = require('../models/userModel');

const userPartofAppoint = (userid, appointment) => {
    if(appointment.hniId !== userid || appointment.wmId !== userid){
        return false;
    }
    return true;
}

exports.appointmentDetail = catchAsync(async (req, res, next) => {
  const { appointmentId } = req.body;
  const appointment = await Appointment.findById(appointmentId);

  if (!appointment) {
    return next(new AppError(400, 'No appointment exists with that id'));
  }
  
  if(userPartofAppoint(req.user._id, appointment) === false){
    return next(new AppError(400, 'You are not part of this appointment'));
  }

  return res.status(200).json({
    sucess: true,
    data: appointment,
  });
});

exports.newAppointment = catchAsync(async (req, res, next) => {
    const {body} = req;
    const {user} = req;

    const recipient = await User.findById(body.receiver);
    if(!recipient){
        return next(new AppError(400, 'The person you want to schedule an appointment with does not exist'));
    }

    if(user.userType === recipient.userType){
        return next(new AppError(400, `You cannot schedule an appointment with another ${user.userType}.`));
    }

    if(!body.receiver){
        return next(new AppError(400, `Please enter an email id of the person you want to schedule meeting with`));
    } else if(!body.time){
        return next(new AppError(400, `Please enter an time of the meeting`));
    } else if(!body.placeType){
        return next(new AppError(400, `Please enter place type`))
    }

    if(body.placeType === "other" && (!body.place || body.place.trim() === "")){
        return next(new AppError(400, `Please enter a place for scheduling the meeting`));
    }

    let hniId, wmId;
    if(user.userType === 'hniId'){
        hniId = user._id;
        wmId = recipient._id;
    }else{
        wmId = user._id;
        hniId =recipient._id;
    }

    const scheduleTime = new Date(body.time).toISOString();

    const newAppointment = await Appointment.create({
        name : req.body.name, 
        sender : req.user._id,
        hniId,
        wmId,
        scheduleTime,
        placeType : body.placeType,
        place : body.place,
        appointmentStatus : 'pending'
    })
    
    res.status(200).json({
        success : true,
        data : newAppointment
    })
});

exports.respond = catchAsync(async (req, res, next) => {
    const {body} = req;

    if(!body.appointmentId || !body.response){
        return next(new AppError(400, `Please enter appointment ID and your response`));
    }

    const appointment = await Appointment.findById(body.appointmentId);
    if(!appointment){
        return next(new AppError(400, `The appointment you are trying to respond to doesnt exist`));
    }

    if(req.user._id === appointment.senderId){
        return next(new AppError(400, `You cannot respond to the appointment`));
    }

    appointment.appointmentStatus = body.response;

    await appointment.save();
    
})

exports.reschedule = catchAsync(async (req, res, next) => {
  const body = req.body;
  const user = req.user;
  const { appointment_id, reschedule_time } = body;
  const appointment = await Appointment.findById(appointment_id);
  if (!appointment) {
    return next(new AppError(400, 'appointment does not exist'));
  }
  if (user._id !== appointment.hniId || user._id !== appointment.wmId) {
    return next(
      new AppError(400, 'You are not associated with this appointment!')
    );
  }

  const newTime = new Date(reschedule_time).toISOString();
  appointment.scheduleTime = newTime;
  appointment.scheduleLog = [...appointment.scheduleLog, newTime];

  await appointment.save();

  return res.status(200).json({
    success: true,
    data: `Appointment rescheduled succesfully`,
  });
});
