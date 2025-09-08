const { where } = require("sequelize");
const Ticket = require("../models/ticketModel");

class TickerService{

    async findAllTickets(){
        return await Ticket.findAll()
    }

    async findTicketByPk(idTicket){
        return await Ticket.findByPk(idTicket)
    }

    async createTicket(ticketData){
        return await Ticket.createTicket(ticketData)
    }

    async deleteTicket(idTicket){
        return await Ticket.deleteTicket(idTicket)
    }
    
    async updateTicket(idTicket, ticketData){
        return await Ticket.update(ticketData, {where:{idTicket}})
    }
}