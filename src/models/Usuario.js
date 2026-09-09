const { DataTypes } = require ('sequelize');
const sequelize = require ('../config/database')

const Usuario = sequelize.define ('Usuario', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    nome:{
        type: DataTypes.STRING,
        allowNull: false, 
    },

    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    cpf_identidade:{
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },

    senha:{
        type: DataTypes.STRING,
        allowNull: false
    },

    telefone:{
        type: DataTypes.STRING,
        allowNull: true
    },

    endereco:{
        type: DataTypes.STRING,
        allowNull: true
    },

    cep:{
        type: DataTypes.STRING,
        allowNull: true
    }
})

module.exports = Usuario