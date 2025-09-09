const database = require("../config/database")

class UserTicket{
    constructor(){
        this.models = database.db.define("Tickets",{
            idTicket:{
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            header:{
                type: database.db.Sequelize.STRING,
                allowNull: false
            },
            description:{
                type: database.db.Sequelize.TEXT,
                allowNull: false
            },
            userId:{
                type: database.db.Sequelize.INTEGER,
                allowNull: false
            },
            email: {
                type: database.db.Sequelize.STRING,
                allowNull: false,
                validate: {isEmail: true}
            },
            localization: {
                type: database.db.Sequelize.STRING,
                allowNull: false
            }
        })
    }
}
module.exports = new UserTicket().models;