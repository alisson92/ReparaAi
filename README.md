# ReparaAí

Projeto desenvolvido como parte da disciplina de **Laboratório de Engenharia de Software – FATEC**.  
O sistema permite o **registro e acompanhamento de solicitações de reparos urbanos**, conectando cidadãos e gestores públicos.

---

## 📌 Sumário

- [Visão Geral](#visão-geral)
- [Arquitetura](#arquitetura)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Como Rodar com Docker (recomendado)](#como-rodar-com-docker-recomendado)
- [Como Rodar Localmente (sem Docker)](#como-rodar-localmente-sem-docker)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Dúvidas & Problemas Comuns](#dúvidas--problemas-comuns)
- [Licença](#licença)

---

## 📖 Visão Geral

O **ReparaAí** é uma aplicação **full‑stack** com **frontend (Vue 3 + Vite)**, **backend (Node.js/Express)** e **MySQL**.  
O objetivo é facilitar a comunicação entre cidadãos e administração pública para registrar, acompanhar e resolver problemas urbanos.

---

## 🏗️ Arquitetura

- **Backend** – API REST em Node.js/Express; ORM com Sequelize; autenticação via JWT; utilização de variáveis de ambiente para configurar banco e chaves.  
- **Frontend** – Aplicação Vue 3 (Vite) consumindo a API.  
- **Banco de Dados** – MySQL 8.0.  
- **Orquestração** – Docker Compose para subir **db**, **backend** e **frontend**.

Fluxo básico:

```
Frontend (Vue) → Backend (API Express) → MySQL (Banco de Dados)
```

---

## 🚀 Tecnologias Utilizadas

**Backend**
- Node.js
- Express 5
- Sequelize + mysql2
- jsonwebtoken, bcryptjs
- axios, cors, dotenv

**Frontend**
- Vue 3
- Vite
- Vue Router
- Axios
- Vue Toastification
- vue3-google-map
- ESLint + Prettier

**Infra**
- Docker / Docker Compose
- MySQL 8.0

---

## ⚙️ Pré-requisitos

- **Docker** e **Docker Compose** (para a forma recomendada de execução), **OU**  
- **Node.js 20.19+** (recomendado) e **npm**/**yarn** caso opte por rodar localmente sem Docker.

> O `frontend/package.json` define engines: `node ^20.19.0 || >=22.12.0`.  
> Utilize Node 20.19+ para evitar incompatibilidades.

---

## 🐳 Como Rodar com Docker (recomendado)

1) **Crie os arquivos `.env` a partir dos exemplos**:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

- **backend/.env**: ajuste `DB_PASSWORD` para bater com o Compose (padrão: `senha`).
- **frontend/.env**: informe `VITE_GOOGLE_MAPS_API_KEY` (chave da API do Google Maps).

2) **Suba a stack** na raiz do projeto:

```bash
docker-compose up --build
```

3) **Acesse no navegador**:

- **Frontend**: http://localhost:5174  ← (mapeado para o Vite interno `5173`)  
- **Backend**:  http://localhost:3000

4) **Encerrar**:

```bash
docker-compose down
```

**Notas importantes do `docker-compose.yml`:**
- `db` (MySQL 8.0) usa: `MYSQL_DATABASE=${DB_NAME:-reparaai}` e `MYSQL_ROOT_PASSWORD=${DB_PASSWORD:-senha}`  
  (Se você não definir um `.env` na raiz, os **padrões** `reparaai` e `senha` serão usados).
- `backend` expõe `PORT` no host: `${PORT:-3000}:3000` (padrão **3000**).
- `frontend` expõe `VITE_PORT` no host: `${VITE_PORT:-5174}:5173` (padrão **5174**).
- A rede Docker interna se chama `reparai-net`; dentro dela, o hostname do banco é **`db`**.

---

## 💻 Como Rodar Localmente (sem Docker)

> **Observação**: se você rodar o backend localmente e quiser usar o MySQL em container, o Compose atual **não** mapeia a porta do `db` para o host. Nesse caso, **instale o MySQL localmente** ou adicione manualmente o mapeamento de portas ao serviço `db` no Compose (ex.: `3306:3306`).

### 1) Backend

```bash
cd backend
cp .env.example .env   # configure as variáveis
npm install
npm run dev
```

- Por padrão o backend sobe em **http://localhost:3000**.  
- Ajuste `DB_HOST`, `DB_USER`, `DB_PASSWORD` e `DB_NAME` conforme seu banco local.

### 2) Frontend

```bash
cd frontend
cp .env.example .env   # configure as variáveis (Google Maps, VITE_PORT se desejar)
npm install
npm run dev
```

- Por padrão o Vite sobe em **http://localhost:5173**.  
- Se quiser manter a mesma porta do Compose (5174 no host), rode o Vite com:  
  `npm run dev -- --port 5174`

---

## 🔑 Variáveis de Ambiente

### Backend (`backend/.env`)

> Baseado em `backend/.env.example`

```env
# Porta da API
PORT=3000

# Banco de Dados
DB_HOST=db
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha_aqui    # troque pela senha do Compose (padrão: senha)
DB_NAME=reparaai

# Google Maps (se aplicável)
GOOGLE_KEY=sua_chave_do_google_maps_aqui
```

> **No Docker Compose**, também existem variáveis com **valores padrão** para o backend:
> - `JWT_SECRET=${JWT_SECRET:-este_e_um_segredo_muito_seguro_para_o_reparaai}`
> - `JWT_EXPIRES_IN=${JWT_EXPIRES_IN:-1d}`  
> Você pode sobrescrevê-las via `.env` na raiz, se necessário.

### Frontend (`frontend/.env`)

> Baseado em `frontend/.env.example`

```env
# Chave para Google Maps
VITE_GOOGLE_MAPS_API_KEY=coloque_sua_chave_aqui

# Porta exposta no host quando usando Docker Compose
VITE_PORT=5174
```

---

## 🧰 Scripts Disponíveis

### Backend (`backend/package.json`)
- `npm run dev` – inicia o servidor com `node --watch src/app.js`

> **Não há suite de testes implementada** no momento. O script `test` não é necessário para rodar o projeto.

### Frontend (`frontend/package.json`)
- `npm run dev` – inicia servidor de desenvolvimento (Vite)
- `npm run build` – gera build de produção
- `npm run preview` – pré-visualiza o build
- `npm run lint` – roda ESLint com `--fix`
- `npm run format` – formata código com Prettier

---

## ❓ Dúvidas & Problemas Comuns

- **Erro de conexão com o banco**: verifique se o `DB_PASSWORD` no `backend/.env` é o mesmo usado no Compose (`senha` por padrão) ou no seu MySQL local.  
- **Frontend não encontra o backend**: certifique-se de que o backend está em `http://localhost:3000`. Se necessário, configure a URL da API no frontend (ex.: via arquivo de configuração/constantes).  
- **Google Maps não carrega**: confira se `VITE_GOOGLE_MAPS_API_KEY` está preenchida e válida.

---

## 📄 Licença

Licença **ISC**. Veja [LICENSE](LICENSE) para mais detalhes.

---

👨‍💻 Autor: **Henrico Hosaki Silva** e colaboradores.
