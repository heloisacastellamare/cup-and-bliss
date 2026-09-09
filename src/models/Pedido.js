const { DataTypes } = require ('sequelize')
const sequelize = require ('../config/database')

const Pedido = sequelize.define ('Pedido', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    valor_total:{
        type: DataTypes.FLOAT,
        allowNull: false
    },

    forma_pagamento:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Cartão de Credito'
    },

    status:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Realizado'
    }
})

module.exports = Pedido