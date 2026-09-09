const sequelize = require ('../config/database')

// Importando os Models
const Usuario = require ('./Usuario')
const Produto = require ('./Produto')
const Pedido = require ('./Pedido')
const ItemPedido = require ('./ItemPedido')
const Favorito = require ('./Favorito')

// Definição de relacionamentos

// Relacionamento Usuário <--> Pedido
Usuario.hasMany(Pedido, {foreignKey: 'usuario_id'})
Pedido.belongsTo(Usuario, {foreignKey: 'usuario_id'})

//Relacionamento Pedido <--> ItemPedido
Pedido.hasMany(ItemPedido, {foreignKey: 'pedido_id'})
ItemPedido.belongsTo(Pedido, {foreignKey: 'pedido_id'})

//Relacionamento Produto <--> ItemPedido
Produto.hasMany(ItemPedido, {foreignKey: 'produto_id'})
ItemPedido.belongsTo(Produto, {foreignKey: 'produto_id'})

//Relacionamento Favoritos (Usuário + Produto)
Usuario.hasMany(Favorito, {foreignKey: 'usuario_id'})
Favorito.belongsTo(Usuario, {foreignKey: 'usuario_id'})

Produto.hasMany(Favorito, {foreignKey: 'produto_id'})
Favorito.belongsTo(Produto, {foreignKey: 'produto_id'})

module.exports = {
    sequelize,
    Usuario,
    Produto,
    Pedido,
    ItemPedido,
    Favorito
}