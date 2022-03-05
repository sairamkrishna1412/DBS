const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    default: undefined,
  },
  email: {
    type: String,
    required: [true, 'please enter your email'],
    unique: true,
  },
  userType : {
    type:String,
    enum : {values : ['hni', 'wm'], message : '{VALUE} is not supported'},
    required: [true, 'userType is a required field']
  },
  password : {
    type : String,
    required: [true, 'Password is a required field']
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
