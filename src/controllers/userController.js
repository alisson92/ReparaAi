const UserSer = require('../services/userService');
const UserService = new UserSer();
class UserController{
    
    async findAllUsers(req,res){
        try{
            const findAll = await UserService.findAllUsers();
            res.status(200).json({
                Users: findAll
            })
        }catch(e){
            res.status(400).json({
                Error: e.message
            })
        }
    }

    async findUserByPk(req,res){
        try{
            const { idUser } = req.params;
            const userData = await UserService.findUserByPk(idUser);
            res.status(200).json({
                User: userData
            })
        }catch(e){
            res.status(400).json({
                Error: e.message
            })
        }
    }

    async registerUser(req,res){
        try{
            const userData = req.body;
            const userRegistered = await UserService.registerUser(userData);
            res.status(201).json({
                Registered: userRegistered
            })
        }catch(e){
            res.status(400).json({
                Error: e.message
            })
        }
    }

    async deleteUser(req,res){
        try{
            const { idUser } = req.params;
            const deletedUser = await UserService.deleteUser(idUser)
            res.status(204).json({
                Deleted: deletedUser
            })
        }catch(e){
            res.status(400).json({
                Error: e.message
            })
        }
    }

    async updateUser(req,res){
        try{
            const { idUser } = req.params;
            const userData = req.body;
            await UserService.updateUser(idUser, userData);
            const result = await UserService.findUserByPk(idUser);
            res.status(200).json({
                 Updated: result });
        }catch(e){
            res.status(400).json({
                Error: e.message
            })
        }
    }
}

module.exports = UserController;