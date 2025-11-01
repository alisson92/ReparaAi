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
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    localization: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING, // Armazena o caminho ou URL da imagem
      allowNull: true,        // Permite null, já que o upload é opcional
    },
  });

  Ticket.associate = (models) => {
    Ticket.belongsTo(models.User, {
      foreignKey: 'idUser',
      as: 'User',
    });
  };

  return Ticket;
};
