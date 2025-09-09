const { where } = require("sequelize");
const Ticket = require("../models/ticketModel");

class TicketService{

    async findAllTickets(){
        return await Ticket.findAll()
    }

    async findTicketByPk(idTicket){
        return await Ticket.findByPk(idTicket)
    }

    async createTicket(ticketData){
        return await Ticket.create(ticketData)
    }

    async deleteTicket(idTicket) {
    return await Ticket.destroy({where: { idTicket: idTicket }});
    }
    
    async updateTicket(idTicket, ticketData){
        return await Ticket.update(ticketData, {where:{idTicket}})
    }
}

module.exports = TicketService