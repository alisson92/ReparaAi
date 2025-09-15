const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController')
const UserControll = new UserController();

router.get('/user/', UserControll.findAllUsers);
router.post('/user/', UserControll.registerUser);
router.post('/login', UserControll.login);
router.get('/user/:idUser', UserControll.findUserByPk);
router.put('/user/:idUser', UserControll.updateUser);
router.delete('/user/:idUser', UserControll.deleteUser);

module.exports = router;