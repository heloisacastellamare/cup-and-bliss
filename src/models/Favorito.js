const { DataTypes } = require ('sequelize')
const sequelize = require ('../config/database')

const Favorito = sequelize.define('Favorito', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
})

module.exports = Favorito