const { Router } = require('express');
const TicketController = require('../controllers/ticketController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../config/uploadConfig'); // ⬅️ Import do multer

const router = Router();
const ticketController = new TicketController();

// Rotas
router.get('/tickets', authMiddleware, ticketController.findAllTickets);

// Rota POST com suporte a upload
router.post(
  '/tickets',
  authMiddleware,
  upload.single('image'), // ⬅️ middleware que processa o arquivo
  ticketController.createTicket
);

router.get('/tickets/:idTicket', authMiddleware, ticketController.findTicketByPk);
router.put('/tickets/:idTicket', authMiddleware, ticketController.updateTicket);
router.delete('/tickets/:idTicket', authMiddleware, ticketController.deleteTicket);

module.exports = router;
