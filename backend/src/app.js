require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path'); // ⬅️ Import necessário para servir imagens

// Importa as conexões e models do banco
const { db, User, Ticket } = require('./config/database'); 
const userRouter = require('./routes/userRoute');
const ticketsRouter = require('./routes/ticketRoute');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ⬇️ Adicione esta linha para servir as imagens da pasta "uploads"
app.use('/uploads', express.static(path.resolve('uploads')));

// Rotas da aplicação
app.use(userRouter);
app.use(ticketsRouter);

// Tratamento de rota inexistente
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Conexão com o banco e inicialização do servidor
db
  .sync({ alter: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`✅ Server running on port ${port}`);
      console.log(`🖼️  Imagens acessíveis via: http://localhost:${port}/uploads/<nome-do-arquivo>`);
    });
  })
  .catch((e) => {
    console.error(`❌ Não foi possível conectar com o banco: ${e}`);
  });
