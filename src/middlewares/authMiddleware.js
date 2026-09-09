const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ error: 'Token de autenticação não fonecido.' })
    }


    const parts = authHeader.split(' ')
    if (parts.length !== 2) {
        return res.status(401).json({ error: 'Erro no formato do Token.' })
    }

    const [scheme, token] = parts
    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ error: 'Token malformatado.' })
    }

    jwt.verify(token, process.env.JWT_SECRET || 'chave_secreta_padrao', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido ou expirado.' })
        }

        //Grava o ID do usuário na requisição para ser usado pelos controllers
        req.usuarioId = decoded.id
        return next() //Libera para ir para a rota controller
    })
}