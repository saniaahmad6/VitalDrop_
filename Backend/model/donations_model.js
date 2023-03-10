const Donation = {
    insertDonor: `
      INSERT INTO Donations
      (id, user_id, appointment_id, status)
      VALUES (?,?,?,?)
    `,
  
    insertBlood: `
      INSERT INTO Bloodbank
      (blood_type, center_id,units_available,)
      VALUES (?,?,?)
      AND
    `,
  
    selectDonor: `
      SELECT user_id , blood_type 
      FROM DonationCenters INNER JOIN Appointments
      ON Bloodbank.center_id = Appointments.center_id
      INNER JOIN Donations ON Donations.appointment_id = Appoinntments.id
      WHERE user_id = (?) 
    `,
  }
  
  module.exports = Donation


  