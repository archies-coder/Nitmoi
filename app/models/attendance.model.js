const mongoose = require('mongoose')
const Student = require('./student.model')

const AttendaceSchema = new mongoose.Schema({
    date: {
      type: String,
      require: [true, 'Date required mann!!']
    },
    present: {
      students: [{type: mongoose.Schema.Types.ObjectId}]
    },
    standard: Number
  });
  
  module.exports = Attendance = mongoose.model('attendance', AttendaceSchema);