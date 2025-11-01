const { Ticket, User } = require('../config/database');

class TicketService {

    /**
     * Busca todos os tickets no banco de dados.
     */
async findAllTickets(userId) {
  return await Ticket.findAll({
    where: { idUser: userId },
    include: {
      model: User,
      as: 'user', // 🔥 ESSENCIAL! precisa bater com o alias em database.js
      attributes: ['name', 'email']
    }
  });
}

    /**
     * Busca um ticket específico pela sua chave primária (ID).
     * @param {number} idTicket O ID do ticket a ser buscado.
     */
    async findTicketByPk(idTicket) {
        return await Ticket.findByPk(idTicket);
    }

    /**
     * Cria um novo ticket no banco de dados, associando-o ao usuário autenticado.
     * @param {object} ticketData Os dados do ticket vindos do formulário.
     * @param {number} userId O ID do usuário vindo do token de autenticação.
     */

async createTicket(ticketData, userId, file) {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error("Usuário da autenticação não encontrado no banco de dados.");
  }

  const dataToSave = {
    ...ticketData,
    idUser: user.idUser,
    email: user.email,
    name: user.name
  };

  if (file) {
    dataToSave.image = `/uploads/${file.filename}`;
  }

  return await Ticket.create(dataToSave);
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