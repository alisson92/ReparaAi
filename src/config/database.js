const { Sequelize } = require ("sequelize");

class Database{
    constructor(){
        this.init();
    }

    init(){
this.db = new Sequelize({
  database: "reparaai",
  host: "db",
  username: "root",
  password: "root",
  dialect: "mysql",
  port: 3306,
  retry: {
    max: 10 // tenta até 10 vezes antes de falhar
  }
});
    }
}

module.exports = new Database();
