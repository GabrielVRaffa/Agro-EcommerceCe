const pool = require('../models/db');

const getAllProducts = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar produto por ID:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// POST /produtos - criar novo produto
const createProduct = async (req, res) => {
  const { name, description, price, image, category } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO products (name, description, price, image, category)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, description, price, image, category]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// PUT /produtos/:id - atualizar produto
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, image, category } = req.body;

  try {
    const result = await pool.query(
      `UPDATE products
       SET name = $1, description = $2, price = $3, image = $4, category = $5
       WHERE id = $6
       RETURNING *`,
      [name, description, price, image, category, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(`Erro ao atualizar produto ${id}:`, error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// DELETE /produtos/:id - remover produto
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.json({ message: 'Produto removido com sucesso' });
  } catch (error) {
    console.error(`Erro ao deletar produto ${id}:`, error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};