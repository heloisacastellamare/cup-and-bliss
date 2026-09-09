const app = require ('./app.js')
const sequelize = require('./config/database.js')

const PORT = process.env.PORT || 5000

//Sincroniza o banco de dados e coloca o servidor para escutar na porta 5000
sequelize.sync().then(() => {
    console.log('Banco de dados conectado e sincronizado!')
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`)
    })
})  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error)
})