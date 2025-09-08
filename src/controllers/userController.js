const UserService = require ('../services/userService');

class UserController{
    
    async findAllUsers(req,res){
        try{
            const findAll = UserService.findAll();
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
            const { idUser } = req.params.id;
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
            const userData = req.body
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
            const { idUser } = req.params.id;
            const deletedUser = UserService.DeletedUser(idUser)
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
            const { idUser } = req.params.id;
            const userData = req.body;
            await userData.updateTicket(idUser, userData);
            const result = await serviceP.FindById(idUser);
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