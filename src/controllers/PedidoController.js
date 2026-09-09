const { Pedido, ItemPedido, Produto, Usuario } = require('../models')

module.exports = {
    //Cria novo pedido
    async store(req, res){
        try {
            //ID do usuario vem do Middleware (JWT)
            const usuario_id = req.usuarioId
            const { itens, forma_pagamento } = req.body

            const usuario = await Usuario.findByPk(usuario_id)
            if (!usuario) {
                return res.status(401).json({
                    error: 'Sessão inválida. Faça login novamente para finalizar o pedido.',
                })
            }

            //Validação simples do carrinho
            if (!Array.isArray(itens) || itens.length === 0) {
                return res.status(400).json({ error: 'O carrinho não pode estar vazio.'})
            }

            let valorTotalCalculado = 0
            const itensParaSalvar = []

            //Loop pelos itens para buscar o preço real no banco de dados e calcular o total
            for (const item of itens){
                if (!item.produto_id || !Number.isInteger(item.quantidade) || item.quantidade <= 0) {
                    return res.status(400).json({ error: 'Os itens do pedido são inválidos.' })
                }

                const produto = await Produto.findByPk(item.produto_id)

                if (!produto) {
                    return res.status(404).json({ error: `Produto com ID ${item.produto_id} não encontrado.` })
                }

                //Calcula o subtotal
                const subtotal = produto.preco * item.quantidade
                valorTotalCalculado += subtotal

                //Monta a estrutura para salvar na tabela ItemPedido
                itensParaSalvar.push({
                    produto_id: produto.id,
                    quantidade: item.quantidade,
                    preco_unitario: produto.preco //Congela o preço atual do produto
                })
            } 
            //Cria a capa do pedido
            const novoPedido = await Pedido.create({
                usuario_id,
                valor_total: valorTotalCalculado,
                forma_pagamento: forma_pagamento || 'Cartão de Crédito',
                status: 'Realizado'
            })

            //Associa o ID do pedido recém-criado a todos os seus itens e os salva
            const itensComPedidoId = itensParaSalvar.map(item => ({
                ...item,
                pedido_id: novoPedido.id
            }))

            await ItemPedido.bulkCreate(itensComPedidoId)

            return res.status(201).json({
                mensagem: 'Pedido realizado com sucesso!',
                pedido_id: novoPedido.id,
                valor_total: valorTotalCalculado
            })

            } catch (error) {
                return res.status(500).json({ error: 'Erro ao processar pedido.', detalhes: error.message})
            }
    },

    //Busca histórico de pedidos do usuário logado
    async index(req, res) {
        try {
            const usuario_id = req.usuarioId


            // Busca todos os pedidos do usuário logado
            const pedidos = await Pedido.findAll({
                where: { usuario_id},
                order: [['createdAt', 'DESC']],
                include: [
                    {
                        model: ItemPedido,
                        include: [
                            {
                                model: Produto,
                                attributes: ['id', 'nome', 'imagem_url', 'categoria']
                            }
                        ]
                    }
                ]
            })

            return res.json(pedidos)
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar histórico de pedidos.', detalhes: error.message})
        }
    }
}