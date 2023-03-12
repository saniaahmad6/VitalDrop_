const { Router } = require('express')
const {
  login,
  register,
  decodeToken,
  updateUser,
  getUserByEmail,
  getRandomManager,
  deleteUser,
} = require('../controllers/user_controller')

const usersRouter = Router()

usersRouter.post('/login', login)
usersRouter.post('/login/signup', register)
//usersRouter.post('/decode', decodeToken)
//usersRouter.get('/random-manager', getRandomManager)
//usersRouter.get('/', getUserByEmail)
//usersRouter.put('/', updateUser)
//usersRouter.delete('/', deleteUser)

module.exports = usersRouter