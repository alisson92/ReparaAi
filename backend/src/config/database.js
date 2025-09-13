const { Sequelize } = require("sequelize");
// Adicione esta linha para carregar as variáveis do arquivo .env
require('dotenv').config();

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.db = new Sequelize({
            // Agora ele lê as variáveis do .env
            database: process.env.DB_NAME,
            host: process.env.DB_HOST,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            dialect: "mysql",
            port: process.env.DB_PORT,
            retry: {
                max: 5 // tenta até 5 vezes antes de falhar
            }
        });
    }
}

module.exports = new Database();