const User = require('./userModel');
const Ticket = require('./ticketModel');

User.hasMany(Ticket, {foreignKey: 'idUser', as: 'tickets'})
Ticket.belongsTo(User, {foreignKey: 'idUser', as: 'user'})

module.exports = { User, Ticket };