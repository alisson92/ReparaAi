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
                type: database.db.Sequelize.STRING,
                unique: true,
                allowNull: false
            },
            phone:{
                type: database.db.Sequelize.STRING,
                allowNull: false
            },
            birthDate: {
                type: database.db.Sequelize.DATE,
                allowNull: false
            },
            localization_lat: {
                type: database.db.Sequelize.DECIMAL(10,8),
                allowNull: false
            },
             localization_lon: {
                type: database.db.Sequelize.DECIMAL(10,8),
                allowNull: false
            }
        })
    }
}
module.exports = new UserModel().models;