const express     = require('express');
const env         = require('dotenv').config();
const mongoose    = require('mongoose');
const dbURI       = require("./app/config/keys").dbURI;
const SECRET      = require("./app/config/keys").SECRET;
const bodypareser = require('body-parser');
const path        = require('path');
const cors        = require('cors');
const session     = require('express-session');
const MongoStore = require('connect-mongo')(session);

//Express App
const app = express();

//Body Parser
app.use(bodypareser.json());
//CORS
app.use(cors());
app.options('*', cors());

if(process.env.NODE_ENV==='production'){
  app.use(express.static(path.join(__dirname, 'client/build')));
}

if(process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1) // trust first proxy
}

const options = {
  url: dbURI,
  ttl: 7*24*60*60
}

const sess = {
  store: new MongoStore(options),
  secure: process.env.NODE_ENV==='production',
  secret: SECRET,
  resave: false,
  saveUninitialized: false,
}

//use sessions for tracking login
app.use(session(sess));

//Routes
const loginRoute = require('./app/Routes/login');
app.use(loginRoute);
const studentRoute = require('./app/Routes/student')
app.use(studentRoute);
const attendanceRoute = require('./app/Routes/attendance')
app.use(attendanceRoute);
const userRoute = require('./app/Routes/user')
app.use(userRoute);
const feeRoute = require('./app/Routes/fees')
app.use(feeRoute);

if(process.env.NODE_ENV==='production'){
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
  });
}

//Mongo
mongoose
  .connect(dbURI, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
  .then(() => {
    console.log("connected ");
  })
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Running ${process.env.NODE_ENV} build on port ${PORT}`))