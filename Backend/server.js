//database initialization and connection
const mysql = require('mysql');
const mysqlInfo = {
  user: 'root',
  host: 'localhost',
  password: '3002_zeyaf',
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
con.changeUser({database : mysqlInfo.database}, function(err) {
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
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')

/*
const banksRouter = require('./route/bank_router')
const donationsRouter = require('./route/donation_router')
const usersRouter = require('./route/user_router')
const ordersRouter = require('./route/order_router')
*/



const app = express()
const port = 5000
dotenv.config()


app.use(morgan('dev'))
app.use(cors({ origin: 'http://localhost:3000' }))
app.use(express.json())
/*
app.use('/users', usersRouter)
app.use('/banks', banksRouter)
app.use('/donations', donationsRouter)
app.use('/orders', ordersRouter)
const { createServer } = require('http')

const server = createServer(app)
*/
app.get('/', (req, res) => {
  res.send('Hello World! - VitalDrop')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



