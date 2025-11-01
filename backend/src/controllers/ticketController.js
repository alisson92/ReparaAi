const TicketSer = require('../services/ticketService');
const TicketService = new TicketSer();

class TicketController {

  // 📦 Buscar todos os tickets do usuário logado
  async findAllTickets(req, res) {
    try {
      const userIdFromToken = req.userId;
      const findAll = await TicketService.findAllTickets(userIdFromToken);

      // 🔹 Se o retorno for nulo ou erro silencioso, evita quebrar o frontend
      if (!findAll || findAll.length === 0) {
        return res.status(200).json({ Tickets: [] });
      }

      // 🔹 Retorno consistente com o esperado pelo frontend
      return res.status(200).json({ Tickets: findAll });

    } catch (e) {
      console.error("Erro ao buscar tickets:", e.message);
      return res.status(400).json({ Error: e.message });
    }
  }

  // 🔍 Buscar um ticket específico
  async findTicketByPk(req, res) {
    try {
      const { idTicket } = req.params;
      const ticketData = await TicketService.findTicketByPk(idTicket);

      if (!ticketData) {
        return res.status(404).json({ message: 'Ticket not found' });
      }

      return res.status(200).json({ Ticket: ticketData });
    } catch (e) {
      console.error("Erro ao buscar ticket:", e.message);
      return res.status(400).json({ Error: e.message });
    }
  }

  // 🧾 Criar um novo ticket
  async createTicket(req, res) {
    try {
      const ticketDataFromForm = req.body;
      const userIdFromToken = req.userId;
      const file = req.file || null;

      const ticketCreated = await TicketService.createTicket(
        ticketDataFromForm,
        userIdFromToken,
        file
      );

      return res.status(201).json({ Created: ticketCreated });
    } catch (e) {
      console.error("ERRO DETALHADO AO CRIAR TICKET:", e);
      return res.status(400).json({ Error: e.message });
    }
  }

  // 🗑️ Deletar ticket
  async deleteTicket(req, res) {
    try {
      const { idTicket } = req.params;

      if (!idTicket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }

      const deletedTicket = await TicketService.deleteTicket(idTicket);
      return res.status(200).json({ Deleted: deletedTicket });
    } catch (e) {
      console.error("Erro ao deletar ticket:", e.message);
      return res.status(400).json({ Error: e.message });
    }
  }

  // ✏️ Atualizar ticket existente
  async updateTicket(req, res) {
    try {
      const { idTicket } = req.params;
      const ticketData = req.body;

      if (!idTicket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }

      await TicketService.updateTicket(idTicket, ticketData);
      const result = await TicketService.findTicketByPk(idTicket);

      return res.status(200).json({ Updated: result });
    } catch (e) {
      console.error("Erro ao atualizar ticket:", e.message);
      return res.status(400).json({ Error: e.message });
    }
  }
}

module.exports = TicketController;
