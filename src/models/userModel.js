const database = require("../config/database")

class UserModel{
    constructor(){
        this.models = database.db.define("Users",{
            idUser:{
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name:{
                type: database.db.Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: database.db.Sequelize.STRING,
                allowNull: false,
                validate: {isEmail: true}
            },
            cpf:{
                type: database.db.Sequelize.INTEGER,
                unique: true,
                allowNull: false
            },
            phone:{
                type: database.db.Sequelize.INTEGER,
                allowNull: false
            },
            birthDate: {
                type: database.db.Sequelize.DATE,
                allowNull: false
            },
            localization: {
                type: database.db.Sequelize.STRING,
                allowNull: false
            }
        })
    }
}
module.exports = new UserModel().models;