const { Produto } = require('../models')

module.exports = {
    //Lista todos os produtos
    async index(req, res){
        try {
            //Captura o parâmetro "categoria" da URL /api/produtos?categoria=Cupcake
            const { categoria } = req.query

            //Cria um objeto de busca vazio
            const onde = {}

            //Se o React enviou uma categoria na URL, adiciona a regra na consulta
            if(categoria) {
                onde.categoria = categoria
            }

            //Busca no banco com filtro aplicadp se tiver
            const produtos = await Produto.findAll({
                where: onde,
                order: [['nome', 'ASC']] //ordem alfabetica
            })

            return res.json(produtos)
        } catch (error) {
            return res.status(500).json({error: 'Erro ao buscar produtos.', detalhes: error.message})
        }
    },

    //Busca o doce do dia
    async doceDoDia(req, res){
        try{
            const doce = await Produto.findOne({
                where: {is_doce_do_dia: true}
            })

            if (!doce) {
                return res.status(404).json({error: 'Nenhum doce do dia definido no momento.'})
            }

            return res.json(doce)
        } catch (error) {
            return res.status(500).json({error: 'Erro ao buscar doce do dia.', detalhes: error.message})
        }
    },

    //Buscar um produto por ID
    async show(req, res){
        try{
            const { id } = req.params

            const produto = await Produto.findByPk(id)

            if (!produto){
                return res.status(404).json({error: 'Produto não encontrado.'})
            }

            return res.json(produto)
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar detalhes do produto.', detalhes: error.message})
        }
    }
}