const express = require('express');
const cors = require('cors');
const database = require('./config/database');
const userRouter = require('./routes/userRoute');
const ticketsRouter = require('./routes/ticketRoute');
const { User, Ticket } = require('./models/relations'); // importa models + relations

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(ticketsRouter);

app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

database.db
    .sync({ force: false }) // alter: true se quiser atualizar tabelas sem perder dados
    .then(() => {
        app.listen(port, () => {
            console.log('Server running in ' + port);
        });
    })
    .catch((e) => {
        console.error(`Não foi possível conectar com o banco: ${e}`);
    });
