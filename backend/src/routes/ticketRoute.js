const { Router } = require('express');
const TicketController = require('../controllers/ticketController'); // 1. Importa a CLASSE
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();

// 2. Cria UMA instância do controller para usar em todas as rotas
const ticketController = new TicketController();

// 3. Usa a instância para registrar os métodos nas rotas
router.get('/tickets', authMiddleware, ticketController.findAllTickets);
router.post('/tickets', authMiddleware, ticketController.createTicket);
router.get('/tickets/:idTicket', authMiddleware, ticketController.findTicketByPk);
router.put('/tickets/:idTicket', authMiddleware, ticketController.updateTicket);
router.delete('/tickets/:idTicket', authMiddleware, ticketController.deleteTicket);

module.exports = router;