const express = require ('express');
const router = express.Router();
const UserController = require ('../controllers/userController')
const UserControll = new UserController();

router.get('/user/' , UserControll.findAllUsers)
router.post('/user/' , UserControll.registerUser)
router.get('/user/:id' , UserControll.findUserByPk)
router.put('/user/:id' , UserControll.updateUser)
router.delete('user/:id' , UserControll.deleteUser)

module.exports = router;