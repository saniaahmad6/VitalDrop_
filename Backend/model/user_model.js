const User = {
    insertUser: `
      INSERT INTO Users
      (name, email_id, password)
      VALUES (?,?,?)
    `,
  
    selectUserByEmail: `
      SELECT * FROM Users WHERE email_id = (?)
    `,
  
    selectRandomManager: `
      SELECT id, email_id FROM AdminUsers 
      ORDER BY RAND() LIMIT 1
    `,
  
    updateUserByEmail: `
      UPDATE Users 
      SET password = (?),  
      WHERE e_mail = (?)
    `,
  
    DeleteUserById: `
      DELETE FROM Users 
      WHERE id = ?
    `,
  }
  
  module.exports = User


  
  