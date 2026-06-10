const express = require('express');
const router = express.Router();

const produtoRoutes = require('./produtoRoutes');
const cardapioRoutes = require('./cardapioRoutes');
const pedidoRoutes = require('./pedidoRoutes');

// Registrar domínios de rotas
router.use('/produtos', produtoRoutes);
router.use('/cardapios', cardapioRoutes);
router.use('/pedidos', pedidoRoutes);

module.exports = router;