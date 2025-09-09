const User = require ('../models/userModel');
const Ticket = require ('../models/ticketModel');

User.hasMany(ticket, {foreignKey: 'userId', as: 'Tickets'})
Ticket.belongsTo(user, {foreignKey: 'ticketId', as: 'Users'})

module.exports = { User, Ticket };