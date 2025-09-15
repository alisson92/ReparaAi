const { Router } = require('express');
const ticketController = require('../controllers/ticketController');
// 1. Importe o nosso novo middleware de autenticação
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();

// 2. Adicione o 'authMiddleware' como um passo intermediário em todas as rotas de ticket.
// A requisição primeiro passará pelo 'authMiddleware' e, se for aprovada, seguirá para o controller.
router.get('/tickets', authMiddleware, ticketController.findAllTickets);
router.post('/tickets', authMiddleware, ticketController.createTicket);
router.get('/tickets/:idTicket', authMiddleware, ticketController.findTicketByPk);
router.put('/tickets/:idTicket', authMiddleware, ticketController.updateTicket);
router.delete('/tickets/:idTicket', authMiddleware, ticketController.deleteTicket);

module.exports = router;