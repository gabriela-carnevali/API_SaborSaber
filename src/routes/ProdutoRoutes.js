const express = require('expres')
const router = express.Router()

const ProdutoController = require('../controllers/ProdutoController')

// Rota para listar todos os produtos
router.get('/', ProdutoController.listar)
router.get('/:id', ProdutoController.buscarPorId)
router.post('/', ProdutoController.cadastrar)
router.put('/:id', ProdutoController.atualizar)
router.delete('/:id', ProdutoController.detelar)

