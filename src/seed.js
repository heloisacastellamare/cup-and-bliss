const { sequelize, Produto, Usuario } = require('./models')
const bcrypt = require('bcryptjs')

async function seeder(){
    try {

        //Sincroniza e recria a estrutura do banco de dados
        await sequelize.sync({ force: true })
        console.log('🌱 Banco de dados sincronizado e limpo!')

        //Insere um usuário Padrão de Teste
        const senhaHash = await bcrypt.hash('123456', 10)
        await Usuario.create({
            nome: 'Cliente Teste',
            email: 'cliente@teste.com',
            senha: senhaHash,
            telefone: '(11) 99999-9999',
            endereco: 'Rua dos Cupcakes, 123',
            cep: '01000-000'
        })
        console.log('Usuário de testes criado com sucesso!')

        //Lista de produtos iniciais
        const produtosIniciais = [
           // --- CUPCAKES ---
            {
                nome: 'Cupcake Doce de Leite',
                descricao: 'Massa fofinha de baunilha, recheada e coberta com doce de leite caseiro cremoso e nozes.',
                preco: '12.50',
                categoria: 'Cupcakes',
                imagem_url: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&q=80&w=500',
                is_doce_do_dia: true
            },
            {
                nome: 'Cupcake de Chocolate Belga',
                descricao: 'Massa intensa de cacau 70%, recheio de ganache e cobertura de brigadeiro gourmet.',
                preco: '14.00',
                categoria: 'Cupcakes',
                imagem_url: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?auto=format&fit=crop&q=80&w=500',
                is_doce_do_dia: false
            },
            {
                nome: 'Cupcake de Pistache',
                descricao: 'Massa de pistache com recheio cremoso e cobertura de brigadeiro branco aromatizado.',
                preco: '18.90',
                categoria: 'Cupcakes',
                imagem_url: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=500',
                is_doce_do_dia: false
            },

            // --- FATIAS ---
            {
                nome: 'Fatia Red Velvet',
                descricao: 'Clássica fatia aveludada com toque de cacau e recheio cremoso à base de Cream Cheese.',
                preco: '16.50',
                categoria: 'Fatias',
                imagem_url: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&q=80&w=500',
                is_doce_do_dia: false
            },
            {
                nome: 'Cheesecake de Frutas Vermelhas',
                descricao: 'Base crocante de biscoito amanteigado, creme leve de queijo e geleia de frutas vermelhas.',
                preco: '18.90',
                categoria: 'Fatias',
                imagem_url: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=500',
                is_doce_do_dia: false
            },
            {
                nome: 'Fatia Bolo Prestígio',
                descricao: 'Massa fofinha de chocolate recheada com coco ralado fresco e cobertura de ganache.',
                preco: '15.00',
                categoria: 'Fatias',
                imagem_url: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&q=80&w=500',
                is_doce_do_dia: false
            },

            // --- COPOS DA FELICIDADE ---
            {
                nome: 'Copo da Felicidade KitKat',
                descricao: 'Camadas de brigadeiro gourmet, creme Ninho, pedaços de KitKat e morangos frescos.',
                preco: '22.00',
                categoria: 'Copos da Felicidade',
                imagem_url: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=500',
                is_doce_do_dia: false
            },
            {
                nome: 'Copo da Felicidade Brownie & Nutella',
                descricao: 'Creme aveludado de Nutella, cubos de brownie artesanal, mousse de leite ninho e raspas.',
                preco: '24.50',
                categoria: 'Copos da Felicidade',
                imagem_url: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=500',
                is_doce_do_dia: false
            },
            {
                nome: 'Copo da Felicidade Banoffee',
                descricao: 'Farofa amanteigada, bananas caramelizadas, doce de leite caseiro e chantilly leve com canela.',
                preco: '20.00',
                categoria: 'Copos da Felicidade',
                imagem_url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=500',
                is_doce_do_dia: false
            },

            // --- BEBIDAS ---
            {
                nome: 'Soda Italiana de Frutas Vermelhas',
                descricao: 'Bebida refrescante levemente gaseificada com xarope artesanal de amora, framboesa e morango.',
                preco: '10.00',
                categoria: 'Bebidas',
                imagem_url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=500',
                is_doce_do_dia: false
            },
            {
                nome: 'Cappuccino Italiano',
                descricao: 'Espresso extraído na hora com leite vaporizado, espuma cremosa e polvilhado com cacau.',
                preco: '12.00',
                categoria: 'Bebidas',
                imagem_url: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80&w=500',
                is_doce_do_dia: false
            },
            {
                nome: 'Iced Latte Caramelo',
                descricao: 'Café gelado artesanal com leite, pedras de gelo e xarope cremoso de caramelo.',
                preco: '14.50',
                categoria: 'Bebidas',
                imagem_url: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=500',
                is_doce_do_dia: false
            }
        ]

        //Insere os produtos em lote no SQLite
        await Produto.bulkCreate(produtosIniciais)
        console.log('🧁 Produtos cadastrados com sucesso!')

        console.log('🚀 Seed finalizado com sucesso!')
        process.exit(0)
    } catch (error) {
        console.error('❌ Erro ao popular o banco de dados:', error.message)
        process.exit(1)
    }
}

seeder()