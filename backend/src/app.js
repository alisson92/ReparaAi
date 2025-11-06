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
db.sync({ alter: true })
  .then(async () => {
    app.listen(port, async () => {
      console.log(`✅ Server running on port ${port}`);
      console.log(`🖼️  Imagens acessíveis via: http://localhost:${port}/uploads/<nome-do-arquivo>`);

      // =======================================================
      // 🔹 CRIA OU SINCRONIZA USUÁRIO ADMIN PADRÃO
      // =======================================================
      try {
        const { User } = require('./config/database');
        const bcrypt = require('bcryptjs');
        const adminEmail = 'admin@reparaai.com';
        const plainPassword = 'admin123';

        let admin = await User.findOne({ where: { email: adminEmail } });

        if (!admin) {
          await User.create({
            name: 'Administrador',
            email: adminEmail,
            password: plainPassword, // será hashada pelo hook
            cpf: '00000000000',
            phone: '00000000000',
            birthDate: new Date('1990-01-01'),
            cep: '00000-000',
            street: 'Rua Principal',
            number: '1',
            neighborhood: 'Centro',
            city: 'Taquaritinga',
            state: 'SP',
            role: 'admin',
          });
          console.log('✅ Usuário admin criado (admin@reparaai.com / admin123)');
        } else {
          const isValid = await bcrypt.compare(plainPassword, admin.password);
          if (!isValid) {
            admin.password = plainPassword;
            await admin.save();
            console.log('🔄 Senha do admin redefinida para padrão (admin123)');
          } else {
            console.log('ℹ️ Usuário admin já existe e está válido.');
          }
          console.log('👑 Admin OK - pronto para login em http://localhost:5174');
        }
      } catch (error) {
        console.error('❌ Erro ao criar/sincronizar admin:', error);
      }
    });
  })
  .catch((e) => {
    console.error(`❌ Não foi possível conectar com o banco: ${e}`);
  });