const { Sequelize } = require("sequelize");
const UserModel = require('../models/userModel');
const TicketModel = require('../models/ticketModel');

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dialect: "mysql",
    port: process.env.DB_PORT,
    retry: {
        max: 5
    }
});

// Load models
const User = UserModel(sequelize);
const Ticket = TicketModel(sequelize, Sequelize.DataTypes); // Pass DataTypes if needed by the model

// Create associations
User.hasMany(Ticket, { foreignKey: 'idUser', as: 'tickets' });
Ticket.belongsTo(User, { foreignKey: 'idUser', as: 'user' });

// Export the database connection and the initialized models
module.exports = {
    db: sequelize,
    User,
    Ticket
};