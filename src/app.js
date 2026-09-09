const express = require('express')
const cors = require('cors')

const authRoutes = require('./routes/authRoutes')
const produtoRoutes = require('./routes/produtoRoutes')
const pedidoRoutes = require('./routes/pedidoRoutes')
const favoritoRoutes = require('./routes/favoritoRoutes')

const app = express()

app.use(cors())
app.use(express.json())


// Modulos de rotas
app.use('/api/auth', authRoutes) // endpoint /api/auth/register e /api/auth/login
app.use('/api/produtos', produtoRoutes) // endpoint /api/produtos
app.use('/api/pedidos', pedidoRoutes) // endpoint /api/pedidos
app.use('/api/favoritos', favoritoRoutes) // endpoint /api/favoritos

module.exports = app
