const express = require('express');
const router = express.Router();
const pool = require('../db/db');
const auth = require('../middleware/auth');

// Get all projects for logged in user
router.get('/', auth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT p.* FROM projects p
       LEFT JOIN project_members pm ON p.id = pm.project_id
       WHERE p.admin_id = $1 OR pm.user_id = $1`,
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create project — admin only
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'admin') 
    return res.status(403).json({ message: 'Only admins can create projects' });
  const { name, description } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO projects (name, description, admin_id) VALUES ($1, $2, $3) RETURNING *',
      [name, description, req.user.id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add member to project — admin only
router.post('/:id/members', auth, async (req, res) => {
  if (req.user.role !== 'admin')
    return res.status(403).json({ message: 'Only admins can add members' });
  const { user_id } = req.body;
  try {
    await pool.query(
      'INSERT INTO project_members (project_id, user_id) VALUES ($1, $2)',
      [req.params.id, user_id]
    );
    res.json({ message: 'Member added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get members of a project
router.get('/:id/members', auth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT u.id, u.name, u.email, u.role FROM users u
       JOIN project_members pm ON u.id = pm.user_id
       WHERE pm.project_id = $1`,
      [req.params.id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;