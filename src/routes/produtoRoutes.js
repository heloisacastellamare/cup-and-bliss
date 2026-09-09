const { Router } = require('express')
const ProdutoController = require('../controllers/ProdutoController')

const router = Router()

//ATENÇÃO!! Rota doce do dia DEVE vir antes das rotas com parâmetros dinâmicos (id)

router.get('/', ProdutoController.index)
router.get('/doce-do-dia', ProdutoController.doceDoDia)
router.get('/:id', ProdutoController.show)

module.exports = router