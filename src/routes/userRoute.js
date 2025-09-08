const express = require ('express');
const router = express.Router();

router.get('/user/')
router.post('/user/')
router.get('/user/:id')
router.put('/user/:id')
router.delete('user/:id')

module.exports = router;