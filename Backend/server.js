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

const tables = ["Users", "DonationCenters", "AdminUsers", "BloodBank", "Appointments", "Donations", "Requests"]

const table_alterations = [
  "ALTER TABLE Users MODIFY id int AUTO_INCREMENT;",
  "ALTER TABLE DonationCenters MODIFY id int AUTO_INCREMENT;",
  "ALTER TABLE AdminUsers MODIFY id int AUTO_INCREMENT;",
  "ALTER TABLE Appointments MODIFY id int AUTO_INCREMENT;",
  "ALTER TABLE Donations MODIFY id int AUTO_INCREMENT;",
  "ALTER TABLE Requests MODIFY id int AUTO_INCREMENT;",
]

table_creations.forEach(query => {
  con.query(query, basicQueryCallback);
});

con.query(`LOCK TABLES ${tables.join(' WRITE,')} WRITE`, basicQueryCallback)
con.query(`SET FOREIGN_KEY_CHECKS = 0`, basicQueryCallback)

table_alterations.forEach(query => {
  con.query(query, basicQueryCallback);
})

con.query(`SET FOREIGN_KEY_CHECKS = 1`, basicQueryCallback)
con.query(`UNLOCK TABLES`, basicQueryCallback)

//Api starts here
const express = require('express')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const urlEncodedParser = bodyParser.urlencoded()
const cookieParser = require('cookie-parser')
const sessions = require('express-session')
const dotenv = require('dotenv')

const app = express()
const port = 5000
dotenv.config()

var session

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
  modalArgs = [req.body.username, req.body.email, req.body.password, req.body.address, req.body.phoneNo]
  con.query(placeModelArgs(user_model.insertUser, modalArgs), (err, result) => {
    if (err) {
      console.error(err)
      res.send({ signup: false })
    } else {
      console.log('Successfuly signed up! ', req.body.username)
      res.send({ signup: true })
    }
  })
})

app.post('/login', urlEncodedParser, (req, res) => {
  if (req.body.email) {
    con.query(placeModelArgs(user_model.selectUserByEmail, [req.body.email]), (err, result) => {
      if (err) {
        console.log("error in login query")
        res.send({ login: false, err: "DB ERROR" })
      }
      else {
        if (result.length != 1) {
          res.send({ login: false, err: "EMAIL NOT REGISTERED" })
        }
        else {
          let stored = result[0]
          if (req.body.password == stored.password) {
            session = req.session;
            session.userid = stored.id;
            res.send({ login: true });
          }
          else {
            res.send({ login: false, err: "INCORRECT PASSWORD" });
          }
        }
      }
    })
  }
})

app.get('/logout', (req, res) => {
  req.session.destroy();
  session = null
  res.send()
});


const sessionChecker = (req, res, next) => {
  if (session && session.userid) {
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

app.get('/user-info', sessionChecker, (req, res) => {
  con.query(placeModelArgs(`SELECT id as uid, name, email_id, address, phone_no FROM Users WHERE id = ?`, [session.userid]), (err, result) => {
    if (err) {
      console.error(err)
      res.send({ error: true, message: "DB error" })
    } else {
      if (result.length != 1) {
        res.send({ error: true, message: "USER NOT FOUND" })
      }
      else {
        res.send(result[0])
      }
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

