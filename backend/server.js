const express = require('express');
const cors = require('cors');

const app = express();

// Permite que o frontend faça requisições para esse backend
app.use(cors());

// Seu código de rotas, middleware, etc
app.use(express.json());

// Rotas
app.use('/produtos', require('./routes/products'));
app.use('/user', require('./routes/user') )

// Porta
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
