const express = require ('express');
const router = express.Router();
const TicketController = require ('../controllers/ticketController')
const TicketControll = new TicketController();

router.get("/tickets/" , TicketControll.findAllTickets);
router.post("/tickets/" , TicketControll.createTicket);
router.get("/tickets/:idTicket" , TicketControll.findTicketByPk);
router.put("/tickets/:idTicket" , TicketControll.updateTicket);
router.delete("/tickets/:idTicket" , TicketControll.deleteTicket);

module.exports = router;