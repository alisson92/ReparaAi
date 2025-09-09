const UserSer = require('../services/userService');
const UserService = new UserSer();
class UserController{
    
    async findAllUsers(req,res){
        try{
            const findAll = await UserService.findAllUsers();

                if(findAll.length === 0){
            res.status(404).json({
                message: "Empty users list"
            })}
                else{
            res.status(200).json({
                Users: findAll
            })
            }}catch(e){
                res.status(400).json({
                    Error: e.message
            })
        }
    }

    async findUserByPk(req,res){
        try{
            const { idUser } = req.params;
            const userData = await UserService.findUserByPk(idUser);
               
                if(!userData){
            res.status(404).json({
                message: "User not found"
            })}
                else{
            res.status(200).json({
                User: userData
            })}
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

            if(!idUser){
                res.status(404)({
                    message: "User not found"
                })}
            else{
                const deletedUser = await UserService.deleteUser(idUser)
                res.status(204).json({
                    Deleted: deletedUser
            })}
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

            if(!idUser){
                res.status(404).json({
                    message: "User not found"
                })}
            else{
            await UserService.updateUser(idUser, userData);
            const result = await UserService.findUserByPk(idUser);
                res.status(200).json({
                    Updated: result })}
            }catch(e){
                res.status(400).json({
                    Error: e.message
            })
        }
    }
}

module.exports = UserController;