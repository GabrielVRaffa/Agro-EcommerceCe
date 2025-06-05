const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const pool = require('../models/db');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || '123456789';

const validateCNPJ = cnpj => /^\d{14}$/.test(cnpj); // Simplificado: 14 dígitos

// Cadastro
router.post('/register', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('cnpj').custom(cnpj => validateCNPJ(cnpj)),
  body('estado').isIn(['PR', 'RS', 'SC']),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password, cnpj, cep, rua, numero, cidade, estado } = req.body;

  try {
    const existing = await pool.query(`SELECT 1 FROM users WHERE email=$1 OR cnpj=$2`, [email, cnpj]);
    if (existing.rows.length > 0) return res.status(409).json({ error: 'Email ou CNPJ já cadastrado' });

    const hashed = await bcrypt.hash(password, 10);
    await pool.query(`
      INSERT INTO users (email, password, cnpj, cep, rua, numero, cidade, estado)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `, [email, hashed, cnpj, cep, rua, numero, cidade, estado]);

    res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

// Login
router.post('/login', [
  body('email').isEmail(),
  body('password').notEmpty(),
], async (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    if (result.rows.length === 0) return res.status(401).json({ error: 'Email não encontrado' });

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Senha incorreta' });

    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },  SECRET,  { expiresIn: '2h' }
    );

    res.json({ token, user: { id: user.id, email: user.email } });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

module.exports = router;