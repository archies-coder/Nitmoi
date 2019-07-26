const express = require('express');
const mongoose = require('mongoose')
const dbURI = require("./app/config/keys").dbURI;
const bodypareser = require('body-parser')
var cors = require('cors')

//Express App
const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

//Body Parser
app.use(bodypareser.json())
//CORS
app.use(cors())
app.options('*', cors());

var allowCrossDomain = function(req, res, next) {     //Might be unnecessary
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}
app.use(allowCrossDomain) 

//Routes
const studentRoute = require('./app/Routes/student')
app.use(studentRoute);
const attendanceRoute = require('./app/Routes/attendance')
app.use(attendanceRoute);

//Mongo
mongoose
  .connect(dbURI, { useNewUrlParser: true })
  .then(() => {
    console.log("connected ");
  })
  .catch(err => console.log(err));


  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
  });
  
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log('Running At '+PORT))