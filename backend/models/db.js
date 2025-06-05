const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'agro-ecommerce', 
  password: '0000', //123 rafaelly 0000 casagranda
  port: 5434, //5432 rafaelly 5434 casagranda
});


(async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'base',
      cnpj TEXT UNIQUE NOT NULL,
      cep TEXT NOT NULL,
      rua TEXT NOT NULL,
      numero TEXT NOT NULL,
      cidade TEXT NOT NULL,
      estado TEXT CHECK (estado IN ('PR', 'RS', 'SC')) NOT NULL
    )
  `);
  console.log('✅ Tabela "users" verificada/criada');
})();


module.exports = pool;
