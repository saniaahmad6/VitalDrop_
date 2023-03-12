const Order = {
    selectOrderById: `
      SELECT * FROM Requests WHERE id = (?)
    `,
  
    insertOrder: `
      INSERT INTO Requests
      (blood_type, amount, center_id, user_id)
      VALUES (?,?,?,?)
    `,
  
    selectOrdersOfAHospital: `
      SELECT * from Request WHERE center_id = (?)
    `,
  
    selectOrdersForAManager: `
      SELECT Request.id, Request.blood_type,  
      Request.amount, Users.name from Request 
      LEFT JOIN Users ON Request.user_id = Users.user_id 
      WHERE id = (?) AND status = "waiting"
    `,
  
    deleteOrder: `
      DELETE FROM Request WHERE user_id = (?)
    `,
  
    updateOrderState: `
      UPDATE Request SET status = (?) WHERE id = (?)
    `,
  
    updateBloodState: `
      UPDATE BloodBank
      LEFT JOIN Apppointments
      ON BloodBank.center_id = Appointments.center_id 
      LEFT JOIN Donation
      ON Appointments.id = Donation.appointment_id 
      SET BloodBank.units_available = BloodBank.units_available - 1
      AND status = "donated" AND blood_type = ? 
      LIMIT ?
    `,
  }
  
  module.exports = Order

