//database initialization and connection
const mysql = require('mysql');
const mysqlInfo = {
  user: 'root',
  host: 'localhost',
  password: 'password',
  database: 'VitalDropDB'
}

var con = mysql.createConnection({ host: mysqlInfo.host, user: mysqlInfo.user, password: mysqlInfo.password });
con.connect(function (err) {
  if (err) {
    console.log("ERROR IN CONNECTING TO MYSQL");
    throw err;
  };
  console.log("Connected!");
});

const basicQueryCallback = (err, result) => {
  if (err) throw err;
  console.log("Query Success!")
}

con.query(`CREATE DATABASE IF NOT EXISTS ${mysqlInfo.database}`, basicQueryCallback)
con.changeUser({ database: mysqlInfo.database }, function (err) {
  if (err) throw err;
});


const table_creations = [
  "create table if not exists Users(id int PRIMARY KEY, email_id varchar(255) not null, name varchar(255), password varchar(255), UNIQUE(email_id), address varchar(255) not null, phone_no varchar(10) not null)",

  "create table if not exists DonationCenters(id int PRIMARY KEY, pincode varchar(10) not null, state varchar(255) not null, address varchar(255) not null)",

  "create table if not exists AdminUsers(id int PRIMARY KEY, email_id varchar(255) not null, name varchar(255) not null, assigned_center int not null, password varchar(255) not null, UNIQUE(email_id), FOREIGN KEY (assigned_center) REFERENCES DonationCenters(id))",

  "create table if not exists BloodBank(blood_type char(4) not null, center_id int not null, units_available int not null, PRIMARY KEY(blood_type, center_id), FOREIGN KEY(center_id) REFERENCES DonationCenters(id))",

  "create table if not exists Appointments(id int PRIMARY KEY, center_id int not null, slot DATETIME, FOREIGN KEY(center_id) REFERENCES DonationCenters(id))",

  "create table if not exists Donations(id int PRIMARY KEY, user_id int not null, appointment_id int not null, status varchar(255), FOREIGN KEY(user_id) REFERENCES Users(id), FOREIGN KEY(appointment_id) REFERENCES Appointments(id))",

  "create table if not exists Requests(id int PRIMARY KEY, user_id int not null, center_id int not null, blood_type char(4) not null, amount int not null, status varchar(255), FOREIGN KEY(user_id) REFERENCES Users(id), FOREIGN KEY(center_id) REFERENCES DonationCenters(id))"
]

table_creations.forEach(query => {
  con.query(query, basicQueryCallback);
});

//Api starts here
const express = require('express')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const urlEncodedParser = bodyParser.urlencoded()
const cookieParser = require('cookie-parser')
const sessions = require('express-session')

const app = express()
const port = 5000

app.get('/', (req, res) => {
  res.send('Hello World! - VitalDrop')
})



const placeModelArgs = (model, args) => {
  let i = 0;
  return model.replace(/\?/g, () => { return args[i++] })
};

const user_model = require('./model/user_model')

let args = ["muneeb", "mun@gmail.com", "pass", "nowhere", 8287315970]
console.log(placeModelArgs(user_model.insertUser, args))
console.log(args)


const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized: true,
  cookie: { maxAge: oneDay },
  resave: false
}));
app.use(cookieParser());

app.post('/signup', urlEncodedParser, (req, res) => {
  if (req.body.email == myemail && req.body.password == mypassword) {
    session = req.session;
    console.log(session.id)
    session.userid = req.body.username;
    res.send({ login: true });
  }
  else {
    res.send({ login: false });
  }
})

app.post('/login', urlEncodedParser, (req, res) => {
  myemail = 'muneeb0ahmed3@gmail.com'
  mypassword = 'password'
  console.log("body::::", req.body)
  if (req.body.email == myemail && req.body.password == mypassword) {
    session = req.session;
    console.log(session.id)
    session.userid = req.body.username;
    res.send({ login: true });
  }
  else {
    res.send({ login: false });
  }
})

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});


const sessionChecker = (req, res, next) => {
  console.log(`Session Checker: ${req.session.id}`);
  console.log(req.session.profile);
  if (req.session.id == session.id) {
    console.log(`Found User Session`);
    next();
  } else {
    console.log(`No User Session Found`);
    res.send({ error: true, redirect: '/login' });
  }
};
// //inject the above into routes that require authentication, Do not use on login/logout routes! thanks!
// //Example
app.get('/personal-info', sessionChecker, (req, res) => {
  let personalInfo = { info: "personal info that should require authentication" }
  res.send(personalInfo)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
