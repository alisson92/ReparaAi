const { Sequelize, DataTypes } = require("sequelize");
const UserModel = require('../models/userModel');
const TicketModel = require('../models/ticketModel');

// 🔹 Criação da conexão com o banco de dados
const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dialect: "mysql",
  port: process.env.DB_PORT,
  logging: false, // Desativa logs SQL no console (opcional)
  retry: { max: 5 }
});

// 🔹 Inicializa os models
const User = UserModel(sequelize, DataTypes);
const Ticket = TicketModel(sequelize, DataTypes);

// 🔗 Define as associações entre as tabelas
User.hasMany(Ticket, {
  foreignKey: 'idUser',
  as: 'tickets', // Um usuário tem vários tickets
});

Ticket.belongsTo(User, {
  foreignKey: 'idUser',
  as: 'user', // Cada ticket pertence a um usuário
});

// 🔹 Teste opcional de conexão (útil para debug)
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco estabelecida com sucesso.');
  } catch (error) {
    console.error('❌ Erro ao conectar com o banco:', error.message);
  }
})();

// 🔹 Exporta a conexão e os models inicializados
module.exports = {
  db: sequelize,
  User,
  Ticket,
};
