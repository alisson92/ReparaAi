const TickerSer = require('../services/ticketService');
const TicketService = new TickerSer()

class TicketController{
    
    async findAllTickets(req,res){
        try{
            const findAll = await TicketService.findAllTickets();
            res.status(200).json({
                Tickets: findAll
            })
        }catch(e){
            res.status(400).json({
                Error: e.message
            })
        }
    }

    async findTicketByPk(req,res){
        try{
            const { idTicket } = req.params;
            const ticketData = await TicketService.findTicketByPk(idTicket);
            res.status(200).json({
                Ticket: ticketData
            })
        }catch(e){
            res.status(400).json({
                Error: e.message
            })
        }
    }

    async createTicket(req,res){
        try{
            const ticketData = req.body;
            const ticketCreated = await TicketService.createTicket(ticketData)
            res.status(201).json({
                Created: ticketCreated
            })
        }catch(e){
            res.status(400).json({
                Error: e.message
            })
        }
    }

    async deleteTicket(req,res){
        try{
            const { idTicket } = req.params;
            const deletedTicket = await TicketService.deleteTicket(idTicket)
            res.status(204).json({
                Deleted: deletedTicket
            })
        }catch(e){
            res.status(400).json({
                Error: e.message
            })
        }
    }

    async updateTicket(req,res){
        try{
            const { idTicket } = req.params;
            const ticketData = req.body;
            await ticketService.updateTicket(idTicket, ticketData);
            const result = await serviceP.FindById(idTicket);
            res.status(200).json({
                Updated: result
             });
        }catch(e){
            res.status(400).json({
                Error: e.message
            })
        }
    }
}

module.exports = TicketController;