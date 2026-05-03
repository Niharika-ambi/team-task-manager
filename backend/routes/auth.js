const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db/db');

router.post('/signup', async (req, res) => {
  const { name, email, password, role, adminSecret } = req.body;

  try {
    if (role === 'admin') {
      if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET) {
        return res.status(403).json({ message: 'Invalid admin secret key' })
      }
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, hashedPassword, role || 'member']
    );
    res.status(201).json({ message: 'User created', user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Email already exists or server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user) return res.status(404).json({ message: 'User not found' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Wrong password' });
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/user-by-email', async (req, res) => {
  const { email } = req.query;
  try {
    const result = await pool.query('SELECT id, name, email FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'User not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;