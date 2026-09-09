const { Router } = require('express')
const PedidoController = require('../controllers/PedidoController')
const authMiddleware = require('../middlewares/authMiddleware')
const { Pedido } = require('../models')

const router = Router()

//Aplica o middleware de autenticação em TODAS as rotas deste aqruivo
router.use(authMiddleware)

router.post('/', PedidoController.store) // POST /api/pedidos
router.get('/', PedidoController.index) // GET /api/pedidos

module.exports = router