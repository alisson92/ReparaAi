const UserSer = require('../services/userService');
const UserService = new UserSer();

class UserController {

    /**
     *@async
     */
    async findAllUsers(req, res) {
        try {
            const findAll = await UserService.findAllUsers();

            if (findAll.length === 0) {
                res.status(404).json({
                    message: "Empty users list"
                })
            } else {
                res.status(200).json({
                    Users: findAll
                })
            }
        } catch (e) {
            res.status(400).json({
                Error: e.message
            })
        }
    }

    /**
     * @async
     * @param { idUser } req.params
     */

    async findUserByPk(req, res) {
        try {
            const { idUser } = req.params;
            const userData = await UserService.findUserByPk(idUser);

            if (!userData) {
                res.status(404).json({
                    message: "User not found"
                })
            } else {
                res.status(200).json({
                    User: userData
                })
            }
        } catch (e) {
            res.status(400).json({
                Error: e.message
            })
        }
    }

    /**
     * @async
     * @param { userData } req.body
     */
    async registerUser(req, res) {
        try {
            const userData = req.body;
            const userRegistered = await UserService.registerUser(userData);

            res.status(201).json({
                Registered: userRegistered
            })
        } catch (e) {
            console.error("ERRO DETALHADO DO SEQUELIZE:", e);

            res.status(400).json({
                Error: e.message
            })
        }
    }

    // --- NOSSO NOVO MÉTODO DE LOGIN ---
    async login(req, res) {
        try {
            const { email, password } = req.body;
            // Validação simples para garantir que os dados foram enviados
            if (!email || !password) {
                return res.status(400).json({ error: "Email e senha são obrigatórios." });
            }

            const result = await UserService.login(email, password);
            return res.status(200).json(result);
        } catch (e) {
            // Usamos 401 (Não Autorizado) para erros de autenticação
            return res.status(401).json({ error: e.message });
        }
    }
    // --- FIM DO MÉTODO DE LOGIN ---

    /**
     * @async
     * @param { idUser } req.params
     */
    async deleteUser(req, res) {
        try {
            const { idUser } = req.params;

            if (!idUser) {
                res.status(404).json({ // Corrigido: .json() é uma função
                    message: "User not found"
                })
            } else {
                const deletedUser = await UserService.deleteUser(idUser)
                res.status(204).json({
                    Deleted: deletedUser
                })
            }
        } catch (e) {
            res.status(400).json({
                Error: e.message
            })
        }
    }

    /**
     * @param { idUser } req.params
     * @param { userData } req.body
     */
    async updateUser(req, res) {
        try {
            const { idUser } = req.params;
            const userData = req.body;

            if (!idUser) {
                res.status(404).json({
                    message: "User not found"
                })
            } else {
                await UserService.updateUser(idUser, userData);
                const result = await UserService.findUserByPk(idUser);
                res.status(200).json({
                    Updated: result
                })
            }
        } catch (e) {
            res.status(400).json({
                Error: e.message
            })
        }
    }
}

module.exports = UserController;