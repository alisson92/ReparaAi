require('dotenv').config()
const express = require('express');
const cors = require('cors');
// Import the whole object from database.js
const { db, User, Ticket } = require('./config/database'); 
const userRouter = require('./routes/userRoute');
const ticketsRouter = require('./routes/ticketRoute');

// We no longer need to import relations.js
// const { User, Ticket } = require('./models/relations');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(userRouter);
app.use(ticketsRouter);

app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Now we use the 'db' object that we exported
db
    .sync({ force: false }) // Remember to set back to false after the first run
    .then(() => {
        app.listen(port, () => {
            console.log('Server running in ' + port);
        });
    })
    .catch((e) => {
        console.error(`Não foi possível conectar com o banco: ${e}`);
    });