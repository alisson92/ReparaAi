# ReparaAí

Projeto desenvolvido como parte da disciplina de Laboratório de Engenharia de Software – FATEC.  
O sistema permite o registro e acompanhamento de solicitações de reparos urbanos, conectando cidadãos e gestores públicos.

---

## 📌 Sumário

- [Visão Geral](#visão-geral)
- [Arquitetura](#arquitetura)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e Execução Local](#instalação-e-execução-local)
- [Uso com Docker / Docker Compose](#uso-com-docker--docker-compose)
- [Configurações / Variáveis de Ambiente](#configurações--variáveis-de-ambiente)
- [Endpoints Principais](#endpoints-principais)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Testes](#testes)
- [Contribuição](#contribuição)
- [Licença](#licença)

---

## 📖 Visão Geral

O **ReparaAí** é uma aplicação **full-stack** composta por **frontend (Vue 3)**, **backend (Node.js/Express)** e **MySQL**.  
O objetivo é facilitar a comunicação entre cidadãos e administração pública para registrar, acompanhar e resolver problemas urbanos.

---

## 🏗️ Arquitetura

- **Backend** – API REST em Node.js com Express + Sequelize + JWT para autenticação.
- **Frontend** – Aplicação Vue 3 com integração ao backend.
- **Banco de Dados** – MySQL 8.0 (containerizado via Docker).
- **Docker Compose** – Orquestra containers para frontend, backend e banco.

Fluxo básico:
```
Frontend (Vue) → Backend (API Express) → MySQL (Banco de Dados)
```

---

## 🚀 Tecnologias Utilizadas

- **Backend**
  - Node.js 20+
  - Express 5
  - Sequelize + MySQL2
  - JWT + BcryptJS
  - Jest (testes)
  - Dotenv, CORS, Axios

- **Frontend**
  - Vue 3
  - Vite
  - Vue Router
  - Axios
  - Vue Toastification
  - Vue3 Google Maps
  - ESLint + Prettier

- **Infra**
  - Docker / Docker Compose

---

## ⚙️ Pré-requisitos

- Node.js **>=20**
- npm ou yarn
- Docker e Docker Compose (para rodar com containers)

---

## 💻 Instalação e Execução Local

### 1. Clonar o repositório

```bash
git clone https://github.com/alisson92/ReparaAi.git
cd ReparaAi
```

### 2. Backend

```bash
cd backend
cp .env.example .env   # Configure variáveis no arquivo .env
npm install
npm run dev
```

O backend rodará em `http://localhost:3000`.

### 3. Frontend

```bash
cd ../frontend
cp .env.example .env   # Configure variáveis no arquivo .env
npm install
npm run dev
```

O frontend rodará em `http://localhost:5173`.

---

## 🐳 Uso com Docker / Docker Compose

1. Crie os arquivos `.env` no **backend** e **frontend**, baseados nos arquivos `.env.example`.
2. Na raiz do projeto, execute:

```bash
docker-compose up --build
```

3. Acesse no navegador:
   - **Frontend**: `http://localhost:5174`
   - **Backend**: `http://localhost:3000`

4. Para encerrar os serviços:

```bash
docker-compose down
```

---

## 🔑 Configurações / Variáveis de Ambiente

### Backend (`.env`)

```env
PORT=3000
DB_HOST=db
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha_aqui
DB_NAME=reparaai
GOOGLE_KEY=sua_chave_google_maps
JWT_SECRET=este_e_um_segredo_muito_seguro_para_o_reparaai
JWT_EXPIRES_IN=1d
```

### Frontend (`.env`)

```env
VITE_GOOGLE_MAPS_API_KEY=sua_chave_google_maps
VITE_PORT=5174
```

---

## 📡 Endpoints Principais

| Método | Rota                | Descrição                     |
|--------|---------------------|--------------------------------|
| POST   | `/api/auth/login`   | Autenticação de usuário        |
| POST   | `/api/users`        | Cadastro de usuário            |
| GET    | `/api/requests`     | Listar solicitações            |
| POST   | `/api/requests`     | Criar nova solicitação         |
| GET    | `/api/requests/:id` | Detalhes de uma solicitação    |
| PUT    | `/api/requests/:id` | Atualizar solicitação          |
| DELETE | `/api/requests/:id` | Remover solicitação            |

*(Endpoints baseados na estrutura típica — confirme com seu backend se necessário)*

---

## 📜 Scripts Disponíveis

### Backend

- `npm run dev` – inicia servidor com hot reload
- `npm run test` – executa testes com Jest

### Frontend

- `npm run dev` – inicia servidor de desenvolvimento (Vite)
- `npm run build` – gera versão de produção
- `npm run preview` – pré-visualiza build
- `npm run lint` – executa ESLint
- `npm run format` – formata código com Prettier

---

## 🧪 Testes

Rodar testes do backend:

```bash
cd backend
npm run test
```

---

## 🤝 Contribuição

1. Faça um fork do projeto.
2. Crie uma branch (`git checkout -b feature/nova-feature`).
3. Commit suas alterações (`git commit -m 'feat: adiciona nova feature'`).
4. Push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

---

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

💡 Desenvolvido por Henrico Hosaki Silva e colaboradores.
