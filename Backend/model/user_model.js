const User = {
    insertUser: `
      INSERT INTO Users
      (name, email_id, password, address, phone_no)
      VALUES ('?','?','?','?','?')
    `,
  
    selectUserByEmail: `
      SELECT * FROM Users WHERE email_id = ('?')
    `,
  
    selectRandomManager: `
      SELECT id, email_id FROM AdminUsers 
      ORDER BY RAND() LIMIT 1
    `,
  
    updateUserByEmail: `
      UPDATE Users 
      SET password = ('?'),  
      WHERE email_id = ('?')
    `,
  
    DeleteUserById: `
      DELETE FROM Users 
      WHERE id = ('?')
    `,
  }
  
  module.exports = User

  /*
  Backend/src/.gitignore Backend/src/controllers/bank_controller.js Backend/src/controllers/donation_controller.js Backend/src/controllers/user_controller.js Backend/src/db_config.js Backend/src/model/bank_model.js Backend/src/model/donations_model.js Backend/src/model/orders_model.js Backend/src/model/user_model.js Backend/src/router/user_router.js Backend/src/server.js Backend/src/util/bank_util.js
        */