const TicketSer = require('../services/ticketService');
const TicketService = new TicketSer()

class TicketController {

    /**
     * @async
     */
    async findAllTickets(req, res) {
        try {
            const findAll = await TicketService.findAllTickets();

            if (findAll.length === 0) {
                // Adicionamos 'return' para enviar a resposta E encerrar a função.
                return res.status(404).json({
                    message: "Empty tickets list"
                });
            } else {
                // Colocamos a resposta de sucesso em um 'else' para garantir
                // que ela só seja executada se o 'if' for falso.
                return res.status(200).json({
                    Tickets: findAll
                });
            }
        } catch (e) {
            return res.status(400).json({
                Error: e.message
            });
        }
    }

    /**
     * @async
     * @param { idTicket } req.params
     */
    async findTicketByPk(req, res) {
        try {
            const { idTicket } = req.params;
            const ticketData = await TicketService.findTicketByPk(idTicket);

            if (!ticketData) {
                return res.status(404).json({
                    message: "Ticket not found"
                });
            } else {
                return res.status(200).json({
                    Ticket: ticketData
                });
            }
        } catch (e) {
            return res.status(400).json({
                Error: e.message
            });
        }
    }

    /**
     * @async
     * @param { ticketData } req.body
     */
    async createTicket(req, res) {
        try {
            const ticketData = req.body;
            const ticketCreated = await TicketService.createTicket(ticketData)
            return res.status(201).json({
                Created: ticketCreated
            });
        } catch (e) {
            console.error("ERRO DETALHADO AO CRIAR TICKET:", e);
            return res.status(400).json({
                Error: e.message
            });
        }
    }

    /**
     * @async
     * @param { idTicket } req.params
     */
    async deleteTicket(req, res) {
        try {
            const { idTicket } = req.params;

            if (!idTicket) {
                return res.status(404).json({
                    message: "Ticket not found"
                });
            } else {
                const deletedTicket = await TicketService.deleteTicket(idTicket);
                return res.status(200).json({
                    Deleted: deletedTicket
                });
            }
        } catch (e) {
            return res.status(400).json({
                Error: e.message
            });
        }
    }

    /**
     * @param { idTicket } req.params
     * @param { ticketData } req.body
     */
    async updateTicket(req, res) {
        try {
            const { idTicket } = req.params;
            const ticketData = req.body;

            if (!idTicket) {
                return res.status(404).json({
                    message: "Ticket not found"
                });
            } else {
                await TicketService.updateTicket(idTicket, ticketData);
                const result = await TicketService.findTicketByPk(idTicket);
                return res.status(200).json({
                    Updated: result
                });
            }
        } catch (e) {
            return res.status(400).json({
                Error: e.message
            });
        }
    }
}

module.exports = TicketController;