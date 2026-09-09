const { Favorito, Produto } = require('../models')

module.exports = {
    //Lista favoritos do usuário logado
    async index(req, res) {
        try{
            const usuario_id = req.usuarioId

            const favoritos = await Favorito.findAll({
                where: { usuario_id },
                include : [
                    {
                        model: Produto,
                        attributes: ['id', 'nome', 'descricao', 'preco', 'categoria', 'imagem_url']
                    }
                ]
            })


            //Mapeai o resultado para retornar diretamente a lista de produtos favoritados
            const produtosFavoritados = favoritos.map(fav => fav.Produto)

            return res.json(produtosFavoritados)
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar favoritos.', detalhes: error.message})
        }
    },


    //Adiciona um produto aos favoritos
    async store(req, res){
        try {
            const usuario_id = req.usuarioId
            const { produto_id } = req.body

            if(!produto_id){
                return res.status(400).json({ error: 'O ID do produto é obrigatório.'})
            }

            //Verifica se o produto realmente existe no banco de dados
            const produtoExiste = await Produto.findByPk(produto_id)
            if(!produtoExiste){
                return res.status(404).json({ error: 'Produto não encontrado'})
            }

            //Verifica se o produto já foi favoritado por esse usuário
            const jaFavoritado = await Favorito.findOne({
                where: {usuario_id, produto_id}
            })

            if(jaFavoritado){
                return res.status(400).json({ Error: 'Esse produto já estpa nos seus favoritos.'})
            }

            //Cria o registro do favorito
            await Favorito.create({
                usuario_id,
                produto_id
            })

            return res.status(201).json({mensagem: 'Produto adicionado aos favoritos com sucesso!'})
        }   catch (error){
            return res.status(500).json({ error: 'Erro ao favoritar produto.', detalhes: error.message})
        }
    },

    //Remove um produto dos favoritos 
    async delete(req, res){
        try{
            const usuario_id = req.usuarioId
            const { produto_id } = req.params

            //Procura a linha de favoritos vinculada ao usuário
            const favorito = await Favorito.findOne({
                where: { usuario_id, produto_id }
            })

            if (!favorito){
                return res.status(404).json({ error: 'Favorito não encontrado.'})
            }

            //Deleta o registro do banco de dados
            await favorito.destroy()

            return res.json({ mensagem: 'Produto removido dos favoritos com sucesso!'})
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao remover favorito.', detalhes: error.message})
        }
    }
}