const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
    firstName: {
      type: String,
      require: [true, 'name required mann!!']
    },
    lastName: {
      type: String,
      require: [true, 'name required mann!!']
    },
    Address: String,
    standard: {
        type: Number,
        require: [true, 'std required mann!!']
    },
    Board: String,
    joinedOn: Date,
    lastYearmarks: {
      physics: Number,
      english: Number,
      maths: Number
    },
    sex: String,
    fees: {
      total: Number,
      installments: [{
          date: {
              type: Date,
          },
          amount: Number
      }], 
    }
  });



const Student = mongoose.model('student', StudentSchema);
module.exports = {
  StudentSchema,
  Student
}