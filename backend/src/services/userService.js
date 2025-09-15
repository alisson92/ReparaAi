const { User } = require('../config/database');
const axios = require('axios');
const bcrypt = require('bcryptjs'); // Importa o bcryptjs
const jwt = require('jsonwebtoken'); // Importa o jsonwebtoken

class UserService {
    async findAllUsers() {
        return await User.findAll();
    }

    async findUserByPk(idUser) {
        return await User.findByPk(idUser);
    }

    async registerUser(userData) {
        // Lógica de Geocodificação (sem alteração)
        const fullAddress = `${userData.street}, ${userData.number}, ${userData.neighborhood}, ${userData.city}, ${userData.state}, ${userData.cep}`;
        const apiKey = process.env.GOOGLE_KEY;
        const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(fullAddress)}&key=${apiKey}`;

        let latitude = null;
        let longitude = null;

        try {
            const response = await axios.get(geocodeUrl);
            if (response.data.status === 'OK' && response.data.results.length > 0) {
                const location = response.data.results[0].geometry.location;
                latitude = location.lat;
                longitude = location.lng;
                console.log(`Coordenadas encontradas para o endereço: Lat ${latitude}, Lon ${longitude}`);
            } else {
                console.warn(`Geocodificação falhou: ${response.data.status}`);
            }
        } catch (error) {
            console.error("Erro ao chamar a API de Geocodificação:", error.message);
        }
        
        const userDataWithCoords = {
            ...userData,
            latitude,
            longitude
        };
        
        return await User.create(userDataWithCoords);
    }

    // --- NOSSA NOVA FUNÇÃO DE LOGIN ---
    async login(email, password) {
        // 1. Encontrar o usuário pelo email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            // Se não encontrar o usuário, lançamos um erro
            throw new Error('Usuário não encontrado ou senha inválida.');
        }

        // 2. Comparar a senha enviada com o hash salvo no banco
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            // Se as senhas não baterem, lançamos um erro (com mensagem genérica por segurança)
            throw new Error('Usuário não encontrado ou senha inválida.');
        }

        // 3. Se tudo estiver correto, gerar o Token JWT
        const payload = { idUser: user.idUser, name: user.name };
        const secret = process.env.JWT_SECRET;
        const options = { expiresIn: process.env.JWT_EXPIRES_IN };

        const token = jwt.sign(payload, secret, options);

        // 4. Retornar os dados do usuário e o token
        return { 
            user: {
                idUser: user.idUser,
                name: user.name,
                email: user.email
            }, 
            token 
        };
    }
    // --- FIM DA FUNÇÃO DE LOGIN ---

    async deleteUser(idUser) {
        const user = await User.findByPk(idUser);
        if (user) {
            await user.destroy();
            return { message: "User deleted successfully" };
        }
        return null;
    }

    async updateUser(idUser, userData) {
        // TODO: A lógica de geocodificação também pode ser adicionada aqui
        // se o endereço do usuário for alterado.
        await User.update(userData, { where: { idUser } });
        return await User.findByPk(idUser);
    }
}

module.exports = UserService;