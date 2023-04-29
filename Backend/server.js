//database initialization and connection
const mysql = require('mysql');
const mysqlInfo = {
  user: 'root',
  host: 'localhost',
  password: 'Md@9536796532',
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


const fs = require('fs')
const csv = require('csv')


con.query("SHOW TABLES LIKE 'Pincodes'", (err, result) => {
  if (result.length == 0) {
    // con.query("create table Pincodes(pincode char(6) PRIMARY KEY, )")
    let columnMap = {}
    let headerStream = fs.createReadStream('./ProcessedPincodeInfo.csv').pipe(csv.parse({ delimiter: ',', to_line: 1 }))
    headerStream.on("data", function (row) {
      row.forEach((col, idx) => {
        columnMap[col] = idx
      });
    })
    headerStream.on("end", function () {
      console.log(columnMap)
      const requiredCols = ['Pincode', 'District', 'StateName']
      let finalData = []
      let dataStream = fs.createReadStream('./ProcessedPincodeInfo.csv').pipe(csv.parse({ delimiter: ',', from_line: 2 }))
      dataStream.on("data", function (row) {
        let curr = []
        requiredCols.forEach(col => {
          curr.push(row[columnMap[col]])
        });
        finalData.push(curr)
      })

      dataStream.on("end", function () {
        console.log(finalData[0], finalData.length)
        con.query("CREATE TABLE Pincodes(Pincode char(6) PRIMARY KEY, District varchar(256), StateName varchar(256))", basicQueryCallback)
        con.query("INSERT INTO Pincodes (Pincode, District, StateName) VALUES ?", [finalData], basicQueryCallback)
        console.log("Succesfully initialized Pincodes")
      })

    })
  }
})


const table_creations = [
  "create table if not exists Users(id int PRIMARY KEY, email_id varchar(255) not null, name varchar(255), password varchar(255), UNIQUE(email_id), address varchar(255) not null, phone_no varchar(10) not null, gender char(10) not null)",

  "create table if not exists DonationCenters(id int PRIMARY KEY, pincode char(6) not null, state varchar(255) not null, address varchar(255) not null)",

  "create table if not exists AdminUsers(id int PRIMARY KEY, email_id varchar(255) not null, name varchar(255) not null, assigned_center int not null, password varchar(255) not null, UNIQUE(email_id), FOREIGN KEY (assigned_center) REFERENCES DonationCenters(id))",

  "create table if not exists BloodBank(blood_type char(4) not null, center_id int not null, units_available int not null, PRIMARY KEY(blood_type, center_id), FOREIGN KEY(center_id) REFERENCES DonationCenters(id))",

  "create table if not exists Appointments(id int PRIMARY KEY, center_id int not null, slot DATE, FOREIGN KEY(center_id) REFERENCES DonationCenters(id))",

  "create table if not exists Donations(id int PRIMARY KEY, user_id int not null, appointment_id int not null, status varchar(255),blood_type varchar(4) not null, FOREIGN KEY(user_id) REFERENCES Users(id), FOREIGN KEY(appointment_id) REFERENCES Appointments(id))",

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

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized: true,
  cookie: { maxAge: oneDay },
  resave: false
}));
app.use(cookieParser());

app.post('/signup', urlEncodedParser, (req, res) => {
  modalArgs = [req.body.username, req.body.email, req.body.password, req.body.address, req.body.phoneNo, req.body.gender]
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
  con.query(placeModelArgs(`SELECT id as uid, name, email_id, address, phone_no, gender FROM Users WHERE id = ?`, [session.userid]), (err, result) => {
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

app.put('/user-update', sessionChecker, (req, res) => {
  const sql = user_model.updateUserByEmail
  const { password, phone, address, e_mail } = req.body

  con.query(sql, [password, phone, address, e_mail], (err, data) => {
    if (err) return res.send({ error: true, success: false, message: err.message })
      (res, err)

    res.send({ success: true, message: 'User updated!' })
  })
})

app.delete('/user-delete', sessionChecker, (req, res) => {
  const sql = user_model.DeleteUserById
  con.query((sql, [session.userid]), (err, data) => {
    if (err) return res.send({ error: true, success: false, message: err.message })
  })
})

app.get('/user-appointments', sessionChecker, (req, res) => {
  const sql = `
  SELECT Appointments.slot, DonationCenters.address
  FROM Donations
  INNER JOIN Appointments ON Donations.appointment_id = Appointments.id
  INNER JOIN DonationCenters ON Appointments.center_id = DonationCenters.id
  WHERE Donations.user_id = ${session.userid};
  `
  con.query(sql, (err, data) => {
    if (err) return res.send({ error: true, success: false, message: err.message })
    res.send(data)
  })
})

app.get('/search-pincode/:pincode', (req, res) => {
  con.query(`
  SELECT * from DonationCenters
   INNER JOIN Pincodes ON Pincodes.Pincode = DonationCenters.pincode 
   WHERE DonationCenters.pincode = '${req.params.pincode}'`,
    (err, result) => {
      if (err) {
        res.send({ centers: [] })
      }
      else {
        res.send({ centers: result })
      }
    })
})


app.get('/search-state/:state/:district', (req, res) => {
  con.query(`
  SELECT * from DonationCenters
   INNER JOIN Pincodes ON Pincodes.Pincode = DonationCenters.pincode 
   WHERE Pincodes.StateName = '${req.params.state}' AND Pincodes.District = '${req.params.district}'`,
    (err, result) => {
      if (err) {
        res.send({ centers: [] })
      }
      else {
        res.send({ centers: result })
      }
    })
})

app.get('/available-states', (req, res) => {
  con.query(`SELECT Distinct(StateName) FROM Pincodes`,
    (err, result) => {
      if (err) {
        console.error(err)
        res.send({ states: [] })
      }
      else {
        console.log(result)
        res.send({ states: result })
      }
    })
})


app.get('/available-districts/:state', (req, res) => {
  con.query(`SELECT Distinct(District) FROM Pincodes WHERE StateName = '${req.params.state}'`,
    (err, result) => {
      if (err) {
        res.send({ districts: [] })
      }
      else {
        res.send({ districts: result })
      }
    })
})


const bank_model = require('./model/bank_model');
const Donation = require('./model/donations_model');


app.get('/search', sessionChecker, (req, res) => {
  const sqlQuery = bank_model.selectDonationCenter
  const state = req.body
  con.query((sqlQuery, [state]), (err, data) => {
    if (err) return res.send({ error: true, success: false, message: err.message })
    res.send(data)
  })
})

app.get('/available-centers', (req, res) => {
  con.query(`SELECT * FROM DonationCenters`, (err, data) => {
    if (err) return res.send({ error: true, success: false, message: err.message })
    res.send(data)
  })
})

app.get('/available-appointments/:centerId', (req, res) => {
  con.query(`SELECT * FROM Appointments WHERE center_id = ${req.params.centerId}`, (err, data) => {
    if (err) return res.send({ error: true, success: false, message: err.message })
    res.send(data)
  })
})


app.post('/new-donation', [urlEncodedParser, sessionChecker], (req, res) => {
  //will not work if there is data missing
  con.query(`SELECT id as uid, name, email_id, address, phone_no, gender FROM Users WHERE id = ${session.userid}`, (err, result) => {
    if (err) {
      console.error(err)
      res.send({ error: true, message: "DB error" })
    } else {
      if (result.length != 1) {
        res.send({ error: true, message: "USER NOT FOUND" })
      }
      else {
        con.query(placeModelArgs(Donation.insertDonor, [session.userid, req.body.appointmentId, "Initialized", req.body.bloodGroup]), (err, result) => {
          if (err) {
            console.error(err)
            res.send({ error: true, message: "DB error" })
          }
          else {
            res.send({ register: true })
          }
        })
      }
    }
  })

})

app.delete('/delete-donation', sessionChecker, (req, res) => {
  con.query(`DELETE FROM Donations WHERE user_id = ${session.userid} `, (err, data) => {
    if (err) return res.send({ error: true, success: false, message: err.message })

  })
})

app.get('/admin-info', (req, res) => {
  con.query(`SELECT * FROM AdminUsers INNER JOIN DonationCenters WHERE AdminUsers.assigned_center = DonationCenters.id and AdminUsers.id = ${session.userid};`, (err, data) => {
    if (err) return res.send({ error: true, success: false, message: err.message })
    res.send(data)
  })
})



app.delete('/delete-admin', sessionChecker, (req, res) => {
  con.query(`DELETE AdminUsers, DonationCenters FROM AdminUsers INNER JOIN DonationCenters WHERE AdminUsers.assigned_center = DonationCenters.id and AdminUsers.id = ${session.userid}; `, (err, data) => {
    if (err) return res.send({ error: true, success: false, message: err.message })

  })
})

app.put('/admin-update',sessionChecker,(req,res)=>{
  const sql = `UPDATE AdminUsers SET email_id = (?) , password = (?) , name =(?)
  WHERE AdminUsers.id = ${session.userid}; `
  const { e_mail,password,name} = req.body
  con.query(sql, [e_mail,password,name],(err,data)=>{
    if (err) return res.send({ error: true, success: false, message: err.message })
      (res, err)

    res.send({ success: true, message: 'AdminUser updated!' })
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

