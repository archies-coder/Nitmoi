const mongoose = require('mongoose')
const Student = require('./student.model').StudentSchema;

const AttendaceSchema = new mongoose.Schema({
    date: {
      type: Date,
      require: [true, 'Date required mann!!']
    },
    present: {
      type: [Student]
    }
  });
  
  module.exports = Attendance = mongoose.model('attendance', AttendaceSchema);