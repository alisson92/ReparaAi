module.exports = (sequelize, DataTypes) => {
    const Ticket = sequelize.define('Ticket', {
        idTicket: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        header: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        idUser: { // Chave estrangeira para o usuário
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        email: { // Mantemos o email para referência rápida
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Voltamos a ter um único campo para a localização vinda do mapa
        localization: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return Ticket;
};