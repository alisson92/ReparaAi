const express = require ('express');
const router = express.Router();

router.post("/tickets/");
router.get("/tickets/" );
router.get("tickets/:id" );
router.put("/tickets/:id", );
router.delete("/tickets/:id" );

module.exports = router;