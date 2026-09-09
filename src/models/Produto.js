const { DataTypes } = require ('sequelize')
const sequelize = require ('../config/database')

const Produto = sequelize.define('Produto', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    nome:{
        type: DataTypes.STRING,
        allowNull: false
    },

    descricao:{
        type: DataTypes.TEXT,
        allowNull: false
    },

    preco:{
        type: DataTypes.FLOAT,
        allowNull: false
    },

    categoria:{
        type: DataTypes.STRING,
        allowNull: false
    },

    imagem_url:{
        type: DataTypes.STRING,
        allowNull: false
    },
    
    is_doce_do_dia:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
})

module.exports = Produto