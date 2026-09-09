const { Sequelize } = require('sequelize')
const path = require('path')

// Instancia a conexão com o banco SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.resolve(__dirname, '..', '..', 'database.sqlite'),
  logging: false
})

// EXPORTAÇÃO DIRETA DA INSTÂNCIA (Crucial para o .define funcionar)
module.exports = sequelize