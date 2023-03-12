const mysql = require('mysql');
const mysqlInfo = {
  user: 'root',
  host: 'localhost',
  password: '3002_zeyaf',
  database: 'VitalDropDB'
}

var db = mysql.createConnection({ host: mysqlInfo.host, user: mysqlInfo.user, password: mysqlInfo.password });
db.connect(function (err) {
  if (err) {
    console.log("ERROR IN CONNECTING TO MYSQL");
    throw err;
  };
  console.log("Connected!");
});



module.exports = db
