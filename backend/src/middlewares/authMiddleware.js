const jwt = require('jsonwebtoken');
const { promisify } = require('util'); // Utilitário do Node.js para converter funções de callback em Promises

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    // 1. Verifica se o token foi enviado no cabeçalho da requisição
    if (!authHeader) {
        return res.status(401).json({ error: 'Acesso negado: Token não fornecido.' });
    }

    // O cabeçalho vem no formato "Bearer [token]".
    // Usamos o split para pegar apenas a parte do token.
    const [, token] = authHeader.split(' ');

    try {
        // 2. Verifica se o token é válido usando a chave secreta
        // Usamos 'promisify' para poder usar async/await com a função jwt.verify
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

        // 3. Se o token for válido, o 'decoded' conterá o payload (o que guardamos nele, ex: idUser).
        // Nós adicionamos o id do usuário ao objeto 'req' para que as próximas funções (os controllers)
        // saibam qual usuário está fazendo a requisição.
        req.userId = decoded.idUser;

        // 4. Deixa a requisição continuar para o seu destino (o controller)
        return next();
    } catch (error) {
        // Se o token for inválido, expirado, ou houver qualquer outro erro
        return res.status(401).json({ error: 'Token inválido.' });
    }
};