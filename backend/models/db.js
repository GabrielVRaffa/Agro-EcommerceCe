const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'agro-ecommerce', // 👈 Corrigido aqui!
  password: '123', // 👈 Coloque a senha correta do seu PostgreSQL
  port: 5432,
});

module.exports = pool;
