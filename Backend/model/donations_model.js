const Donation = {
    insertDonor: `
      INSERT INTO Donations
      (id, user_id, appointment_id, status)
      VALUES ('?','?','?','?')
    `,
  
    insertBlood: `
      INSERT INTO Bloodbank
      (blood_type, center_id,units_available,)
      VALUES ('?','?','?')
      
    `,
  
    selectDonor: `
      SELECT user_id , blood_type 
      FROM DonationCenters INNER JOIN Appointments
      ON Bloodbank.center_id = Appointments.center_id
      INNER JOIN Donations ON Donations.appointment_id = Appointments.id
      WHERE user_id = ('?') 
    `,
  }
  
  module.exports = Donation


  //"create table if not exists DonationCenters(id int PRIMARY KEY, pincode varchar(10) not null, state varchar(255) not null, address varchar(255) not null)",