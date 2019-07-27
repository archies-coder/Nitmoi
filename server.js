const express = require('express');
const mongoose = require('mongoose')
const dbURI = require("./app/config/keys").dbURI;
const SECRET = require("./app/config/keys").SECRET;
const bodypareser = require('body-parser');
const path = require('path')
var cors = require('cors');
const session = require('express-session')

//Express App
const app = express();


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
app.use(allowCrossDomain) ;

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
  });
}

//use sessions for tracking logins
app.use(session({
  name: 'SESS_SID',
  secret: SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 600000,
}
}));

//Routes
const loginRoute = require('./app/Routes/login');
app.use(loginRoute)

const studentRoute = require('./app/Routes/student')
app.use(studentRoute);
const attendanceRoute = require('./app/Routes/attendance')
app.use(attendanceRoute);
const userRoute = require('./app/Routes/user')
app.use(userRoute);


//Mongo
mongoose
  .connect(dbURI, { useNewUrlParser: true })
  .then(() => {
    console.log("connected ");
  })
  .catch(err => console.log(err));


  

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log('Running At '+PORT))