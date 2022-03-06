const mongoose = require('mongoose');

const { Schema } = mongoose;

const appointmentSchema = new Schema({
  name: {
    type: String,
    default: undefined,
  },
  hniId : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Provide a valid HNI ID']
  },
  senderId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User',
    required: [true, 'Enter valid sender ID']
  },
  wmId : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Provide a valid WM ID']
  },
  scheduleTime: {
    type : Date, 
    required : [true, "Provide a schedule time"]
  },
  scheduleLog : {
    type : [Date],
    default : []
  },
  placeType : {
    type : String,
    enum : {values : ['home', 'other'], message : '{VALUE} is not supported'},
    required: [true, 'placeType is a required field']
  },
  place : {
    type : String,
    default : null
  },
  appointmentStatus : {
    type : String,
    enum : {values : ['accepted', 'rejected', 'rescheduled', 'finished', 'pending'], message : '{VALUE} is not supported'},
    default : 'pending'
  },
});

const appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = appointment;