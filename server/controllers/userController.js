const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const Appointment = require('../models/appointmentModel');

exports.dashboard = catchAsync((req, res, next) => {
    const user = req.user;
    const type = user.userType;
    let appointments;
    if(type === 'wm'){
        appointments = Appointment.find({wm_id : user.id});
    }else{
        appointments = Appointment.find({hni_id : user.id});
    }

    return res.status(200).json({
        success : true,
        data : appointments
    });
});
