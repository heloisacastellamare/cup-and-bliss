const { Router } = require('express')
const AuthController = require('../controllers/AuthController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = Router()

//Caminhos das rotas de autenticação
router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.get('/me', authMiddleware, AuthController.me)
router.patch('/me', authMiddleware, AuthController.update)

module.exports = router