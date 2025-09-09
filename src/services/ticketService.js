const { where } = require("sequelize");
const Ticket = require("../models/ticketModel");

class TickerService{

    async findAllTickets(){
        return await Ticket.findAllTickets()
    }

    async findTicketByPk(idTicket){
        return await Ticket.findByPk(idTicket)
    }

    async createTicket(ticketData){
        return await Ticket.create(ticketData)
    }

    async deleteTicket(idTicket){
        return await Ticket.destroy(idTicket)
    }
    
    async updateTicket(idTicket, ticketData){
        return await Ticket.update(ticketData, {where:{idTicket}})
    }
}

module.exports = TickerService