const mongoose = require('mongoose');

const { Schema } = mongoose;

const appointentSchema = new Schema({
  name: {
    type: String,
    default: undefined,
  },
  hniId : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Provide a valid HNI ID']
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
    type : [Date]
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
    enum : {values : ['accept', 'reject', 'reschedule', 'finish'], message : '{VALUE} is not supported'},
    required: [true, 'placeType is a required field']
  },
});

const User = mongoose.model('Appointment', appointmentSchema);

module.exports = User;