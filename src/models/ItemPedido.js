const { DataTypes } = require ('sequelize')
const sequelize = require ('../config/database')

const ItemPedido = sequelize.define('ItemPedido', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    preco_unitario: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
})

module.exports = ItemPedido