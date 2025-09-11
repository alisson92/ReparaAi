const { Sequelize } = require ("sequelize");

class Database{
    constructor(){
        this.init();
    }

    init(){
        this.db = new Sequelize({
            database: "reparaai",
            host: "reparai-db",
            username: "root",
            dialect: "mysql",
            password: "root"
        });
    }
}

module.exports = new Database();
