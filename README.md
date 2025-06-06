# 🌾 AgroEcommerce - Plataforma para Produtos da Agricultura Familiar - Projeto baseado na materia de Comércio Eletrônico 

## 📖 Descrição
Plataforma web de e-commerce desenvolvida para conectar pequenos produtores da agricultura familiar a consumidores, oferecendo uma experiência de compra simples e eficiente.

## 🚀 Funcionalidades
- Cadastro e login de usuários (produtor e cliente)
- Catálogo de produtos
- Carrinho de compras
- Processo de checkout
- Painel administrativo para gerenciar produtos e pedidos

## 🛠️ Tecnologias Utilizadas
- *Frontend:* React.js + Tailwind CSS
- *Backend:* Node.js (Express)
- *Banco de Dados:* PostgreSQL
- *Outros:* JWT, Bcrypt, Sequelize, REST API

  
## 🏗️ Arquitetura do Projeto
```
plaintext
.
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   └── server.js
└── frontend
    ├── src
    │   ├── components
    │   ├── pages
    │   ├── assets
    │   └── App.js
```

## 🖼️ Diagrama de Fluxo
```
    A[Usuário acessa site] --> B[Frontend React]
    B --> C[Requisições HTTP]
    C --> D[API Express (Node.js)]
    D --> E[Banco de Dados PostgreSQL]
    D --> F[Retorna dados para frontend]
```
![Diagrama](https://github.com/user-attachments/assets/4897c967-d264-4229-8564-eb153ffa67ae)

---
## ⚙️ Como Executar o Projeto

### 🔧 Pré-requisitos
- Node.js
- PostgreSQL
- Git

### 📦 Backend
cd backend /
npm install /
npm run dev /
Acesse em http://localhost:5000

### 💻 Frontend
cd frontend /
npm install /
npm run dev /
Acesse em http://localhost:3000

---
