const express = require ('express');
const router = express.Router();
const TicketController = require ('../controllers/ticketController')
const TicketControll = new TicketController();

router.get("/tickets/" , TicketControll.findAllTickets);
router.post("/tickets/" , TicketControll.createTicket);
router.get("tickets/:id" , TicketControll.findTicketByPk);
router.put("/tickets/:id" , TicketControll.updateTicket);
router.delete("/tickets/:id" , TicketControll.deleteTicket);

module.exports = router;