const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'agro-ecommerce-new', 
  password: '123', //123 rafaelly 0000 casagranda
  port: 5432, //5432 rafaelly 5434 casagranda
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

  await pool.query(`
    CREATE TABLE IF NOT EXISTS pedidos (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      produtos JSONB NOT NULL,
      valor_produtos NUMERIC(10, 2) NOT NULL,
      valor_frete NUMERIC(10, 2) NOT NULL,
      valor_total NUMERIC(10, 2) NOT NULL,
      data_pedido TIMESTAMP DEFAULT NOW()
    )
  `);
  console.log('✅ Tabela "pedidos" verificada/criada');
})();


module.exports = pool;
