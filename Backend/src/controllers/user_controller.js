const { sign, verify } = require('jsonwebtoken')

const db = require('../../db_config')
const User = require('../../model/user_model')

function login(req, res) {
  const { email_id, password } = req.body
  const sql = User.selectUserByEmail

  db.query(sql, [email_id], (err, data) => {
    if (err)  return res.json({ error: true, success: false, message: err.message })
(res, err)

    const user = data[0]

    if (!user) res.json({ success: false, message: 'User is not found!' })
    else if (user.password !== password)
      res.json({ success: false, message: 'Wrong password!' })
    else {
      const token = sign(
        {
          email_id: user.email_id,
        },
        process.env.TOKEN_SECRET,
        {
          expiresIn: '24h',
        }
      )
      res.json({ success: true, message: 'Logged in!', token })
    }
  })
}

function register(req, res) {
  const { name, email_id, password } = req.body
  const selectUser = User.selectUserByEmail

  db.query(selectUser, [email_id], (err, data) => {
    if (err)  return res.json({ error: true, success: false, message: err.message })
(res, err)

    if (data[0])
      return res.json({ success: false, message: 'User already registered!' })
    else {
      const regUser = User.insertUser

      db.query(
        regUser,
        [name, email_id, password],
        (err, data) => {
          if (err)  return res.json({ error: true, success: false, message: err.message })
(res, err)

          res.json({ success: true, message: 'Successfully registered!' })
        }
      )
    }
  })
}

function decodeToken(req, res) {
  let token = req.body.token

  if (!token) return res.json({ success: false, message: 'Invalid Token!' })

  try {
    const decoded = verify(token, process.env.TOKEN_SECRET)
    return res.json({
      success: true,
      message: 'Token Verified!',
      user: decoded,
    })
  } catch (err) {
    console.error(err.message)
  }
}

function getRandomManager(req, res) {
  const sql = User.selectRandomManager

  db.query(sql, (err, data) => {
    if (err)  return res.json({ error: true, success: false, message: err.message })
(res, err)

    res.json(data[0])
  })
}

function getUserByEmail(req, res) {
  const { email_id } = req.query
  const sql = User.selectUserByEmail

  if (!email_id)
    return res.json({ success: false, message: 'Email is not specified' })

  db.query(sql, [email_id], (err, data) => {
    if (err)  return res.json({ error: true, success: false, message: err.message })
(res, err)

    res.json(data[0])
  })
}

function updateUser(req, res) {
  const sql = User.updateUserByEmail
  const { password, email_id } = req.body

  db.query(sql, [password, email_id], (err, data) => {
    if (err)  return res.json({ error: true, success: false, message: err.message })
(res, err)

    res.json({ success: true, message: 'User updated!' })
  })
}

function deleteUser(req, res) {
  const sql = User.DeleteUserById
  const { id } = req.query

  db.query(sql, [id], (err, data) => {
    if (err)  return res.json({ error: true, success: false, message: err.message })
(res, err)

    res.json({ success: true, message: 'User deleted!' })
  })
}

module.exports = {
  login,
  register,
  decodeToken,
  getRandomManager,
  getUserByEmail,
  updateUser,
  deleteUser,
}



// "create table if not exists Users(id int PRIMARY KEY, email_id varchar(255) not null, name varchar(255), password varchar(255), UNIQUE(email_id))",
