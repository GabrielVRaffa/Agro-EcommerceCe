const express = require('express');
const router = express.Router();
const pool = require('../models/db');

// POST /pedidos
router.post('/', async (req, res) => {
  const { user_id, produtos, valor_produtos, valor_frete } = req.body;

  if (!user_id || !Array.isArray(produtos) || produtos.length === 0) {
    return res.status(400).json({ error: 'Dados do pedido inválidos.' });
  }

  try {
    const valor_total = parseFloat(valor_produtos) + parseFloat(valor_frete);

    const result = await pool.query(
      `INSERT INTO pedidos (user_id, produtos, valor_produtos, valor_frete, valor_total)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [user_id, JSON.stringify(produtos), valor_produtos, valor_frete, valor_total]
    );

    res.status(201).json({ message: 'Pedido registrado com sucesso', pedido: result.rows[0] });
  } catch (error) {
    console.error('❌ Erro ao registrar pedido:', error);
    res.status(500).json({ error: 'Erro interno ao registrar pedido' });
  }
});

// GET /pedidos/:userId — Lista os pedidos de um usuário
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM pedidos WHERE user_id = $1 ORDER BY data_pedido DESC`,
      [userId]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('❌ Erro ao buscar pedidos:', error);
    res.status(500).json({ error: 'Erro ao buscar pedidos do usuário' });
  }
});

module.exports = router;