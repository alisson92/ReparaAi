const express = require('express');
const database = require('./config/database');
const userRouter = require('./routes/userRoute');
const ticketsRouter = require('./routes/ticketRoute');

const app = express();
const port = 3000;

require('./models/UserModel');
require('./models/TicketModel');

app.use(express.json());
app.use(userRouter);
app.use(ticketsRouter);

app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

database.db
    .sync({ force: true }) // alter: true se quiser atualizar tabelas sem perder dados
    .then(() => {
        app.listen(port, () => {
            console.log('Server running in ' + port);
        });
    })
    .catch((e) => {
        console.error(`Não foi possível conectar com o banco: ${e}`);
    });