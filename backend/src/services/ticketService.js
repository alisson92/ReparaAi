const { Ticket } = require('../config/database');

class TicketService {

    /**
     * Busca todos os tickets no banco de dados.
     */
    async findAllTickets() {
        return await Ticket.findAll();
    }

    /**
     * Busca um ticket específico pela sua chave primária (ID).
     * @param {number} idTicket O ID do ticket a ser buscado.
     */
    async findTicketByPk(idTicket) {
        return await Ticket.findByPk(idTicket);
    }

    /**
     * Cria um novo ticket no banco de dados.
     * @param {object} ticketData Os dados do ticket a serem criados.
     */
    async createTicket(ticketData) {
        // Esta função simplesmente cria o ticket com os dados recebidos do frontend.
        return await Ticket.create(ticketData);
    }

    /**
     * Deleta um ticket do banco de dados pelo ID.
     * @param {number} idTicket O ID do ticket a ser deletado.
     */
    async deleteTicket(idTicket) {
        const ticket = await Ticket.findByPk(idTicket);
        if (ticket) {
            await ticket.destroy();
            return { message: "Ticket deletado com sucesso." };
        }
        return null;
    }

    /**
     * Atualiza os dados de um ticket existente.
     * @param {number} idTicket O ID do ticket a ser atualizado.
     * @param {object} ticketData Os novos dados para o ticket.
     */
    async updateTicket(idTicket, ticketData) {
        await Ticket.update(ticketData, { where: { idTicket } });
        return await this.findTicketByPk(idTicket);
    }
}

module.exports = TicketService;