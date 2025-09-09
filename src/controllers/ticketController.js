const TicketSer = require('../services/ticketService');
const TicketService = new TicketSer()

class TicketController{
    
    async findAllTickets(req,res){
        try{
            const findAll = await TicketService.findAllTickets();

                if(findAll.length === 0){
                    res.status(404).json({
                        message: "Empty tickets list"
                })}
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

                if(!ticketData){
                    res.status(404).json({
                        message: "Ticket not found"
                    })
                }else{
                    res.status(200).json({
                        Ticket: ticketData
                })}
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
            
            if(!idTicket){
                res.status(404).json({
                    message: "Ticket not found"
                })}
            else{
                const deletedTicket = await TicketService.deleteTicket(idTicket);
                res.status(200).json({
                    Deleted: deletedTicket
            })}
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

            if(!idTicket){
                res.status(404).json({
                    message: "Ticket not found"
                })}
            else{
            await TicketService.updateTicket(idTicket, ticketData);
            const result = await TicketService.findTicketByPk(idTicket);
                res.status(200).json({
                    Updated: result
             })}
            }catch(e){
                res.status(400).json({
                    Error: e.message
            })
        }
    }
}

module.exports = TicketController;