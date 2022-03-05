const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  answer: {
    type: [String],
    required: [true, 'Please provide your answer'],
    validate: {
      validator: (answer) => answer.length,
      message: 'Please provide your answer',
    },
  },
});

const responseModel = mongoose.model('Response', responseSchema);
module.exports = responseModel;
