const { Router } = require('express')
const FavoritoController = require('../controllers/FavoritoController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = Router()

//Protege todas as rotas de favoritos com autenticação JWT
router.use(authMiddleware)

router.get('/', FavoritoController.index) // GET /api/favoritos
router.post('/', FavoritoController.store) // POST /api/favoritos
router.delete('/:produto_id', FavoritoController.delete) // DELETE /api/favoritos

module.exports = router