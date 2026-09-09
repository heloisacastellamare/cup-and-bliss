const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/Usuario')

const SALT_ROUNDS = 10

module.exports = {
    async me(req, res) {
        try {
            const usuario = await Usuario.findByPk(req.usuarioId, {
                attributes: ['id', 'nome', 'email', 'telefone', 'endereco']
            })

            if (!usuario) {
                return res.status(404).json({ error: 'Usuário não encontrado.' })
            }

            return res.json(usuario)
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar perfil.', detalhes: error.message })
        }
    },

    async update(req, res) {
        try {
            const { nome, email, telefone, endereco } = req.body
            const usuario = await Usuario.findByPk(req.usuarioId)

            if (!usuario) {
                return res.status(404).json({ error: 'Usuário não encontrado.' })
            }

            if (email && email !== usuario.email) {
                const emailEmUso = await Usuario.findOne({ where: { email } })
                if (emailEmUso && emailEmUso.id !== usuario.id) {
                    return res.status(400).json({ error: 'Este e-mail já está sendo usado.' })
                }
            }

            await usuario.update({
                nome: nome?.trim() || usuario.nome,
                email: email?.trim() || usuario.email,
                telefone: telefone?.trim() || null,
                endereco: endereco?.trim() || null,
            })

            return res.json({
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                telefone: usuario.telefone,
                endereco: usuario.endereco,
            })
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao atualizar perfil.', detalhes: error.message })
        }
    },

    //Rota de CADASTRO
    async register(req, res) {
        try {
            const {nome, email, senha, cpf, telefone, endereco, cep} = req.body
            //Verifica se o e-mail já está cadastrado
            const usuarioExiste = await Usuario.findOne({ where: {email} })
            if (usuarioExiste) {
                return res.status(400).json({ error: 'E-mail já cadastrado na plataforma.' })
            }

            //Gera o HASH da senha antes de salvar no banco
            const senhaHash = await bcrypt.hash(senha, SALT_ROUNDS)

            //Cria o usuário salvando a senha criptografada
            const novoUsuario = await Usuario.create({
                nome,
                email,
                senha: senhaHash,
                cpf,
                telefone,
                endereco,
                cep
            })

            //Retornar o usuário criado
            return res.status(201).json({
                id: novoUsuario.id,
                nome: novoUsuario.nome,
                email: novoUsuario.email
            })
        }catch (error) {
            return res.status(500).json({ error: 'Erro ao cadastrar usuário.', detalhes: error.message})
        }
    },



    //Rota de LOGIN
    async login(req, res) {
        try {
            const {email, senha} = req.body

            //Busca o usuário pelo e-mail
            const usuario = await Usuario.findOne({ where: {email} })
            if (!usuario) {
                return res.status(401).json({ error: 'Usuário não encontrado ou senha incorreta.'})
            }

            //Compara a senha informada com o HASH salvo no banco
            const senhaValida = await bcrypt.compare(senha, usuario.senha)
            if (!senhaValida){
                return res.status(401).json({ error: 'Usuário não encontrado ou senha incorreta.'})
            }

            //Gera o Token JWT contendo ID e o e-mail do usuário
            const token = jwt.sign(
                { id: usuario.id, email: usuario.email },
                process.env.JWT_SECRET || 'chave_secreta_padrao',
                { expiresIn: '1d' }//dura 1 dia
            )

            //Retorna os dados do usuário logado e o Token
            return res.json({
                usuario: {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email
                },
                token
            })
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao realizar login.', detalhes: error.message})
        }
    }
}