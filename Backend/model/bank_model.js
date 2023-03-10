const Bank={
selectBank: `
SELECT BloodBank.center_id, AdminUsers.name AS manager,
    DonationCenters.address, BloodBank.units_available, COUNT(BloodBank.units_available) AS size
    FROM DonationCenters LEFT JOIN BloodBank 
    ON Bloodbank.center_id = DonationCenters.id
    RIGHT JOIN AdminUsers ON AdminUsers.assigned_center = DonationCenters.id
    GROUP BY bank_id
` ,   
selectTotalDonatedBlood: `
    SELECT COUNT(*) as total_donated_blood FROM BloodBank
  `,

  selectAvailableBloodTypes: `
  SELECT BloodBank.blood_type, COUNT(BloodBank.units_available) AS num_of_blood
  FROM BloodBank 
  GROUP BY blood_type
  ORDER BY num_of_blood DESC
`,

}

module.exports=Bank


/*
 "create table if not exists Users(id int PRIMARY KEY, email_id varchar(255) not null, name varchar(255), password varchar(255), UNIQUE(email_id))",

  "create table if not exists DonationCenters(id int PRIMARY KEY, pincode varchar(10) not null, state varchar(255) not null, address varchar(255) not null)",
  
  "create table if not exists AdminUsers(id int PRIMARY KEY, email_id varchar(255) not null, name varchar(255) not null, assigned_center int not null, password varchar(255) not null, UNIQUE(email_id), FOREIGN KEY (assigned_center) REFERENCES DonationCenters(id))",

  "create table if not exists BloodBank(blood_type char(4) not null, center_id int not null, units_available int not null, PRIMARY KEY(blood_type, center_id), FOREIGN KEY(center_id) REFERENCES DonationCenters(id))",

  "create table if not exists Appointments(id int PRIMARY KEY, center_id int not null, slot DATETIME, FOREIGN KEY(center_id) REFERENCES DonationCenters(id))",

  "create table if not exists Donations(id int PRIMARY KEY, user_id int not null, appointment_id int not null, status varchar(255), FOREIGN KEY(user_id) REFERENCES Users(id), FOREIGN KEY(appointment_id) REFERENCES Appointments(id))",

  "create table if not exists Requests(id int PRIMARY KEY, user_id int not null, center_id int not null, blood_type char(4) not null, amount int not null, status varchar(255), FOREIGN KEY(user_id) REFERENCES Users(id), FOREIGN KEY(center_id) REFERENCES DonationCenters(id))"


*/