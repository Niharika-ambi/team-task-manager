const express = require('express');
const router = express.Router();
const pool = require('../db/db');
const auth = require('../middleware/auth');

// Dashboard summary — MUST be before /:id routes
router.get('/dashboard', auth, async (req, res) => {
  try {
    const total = await pool.query(
      'SELECT COUNT(*) FROM tasks WHERE assigned_to = $1',
      [req.user.id]
    );
    const completed = await pool.query(
      "SELECT COUNT(*) FROM tasks WHERE assigned_to = $1 AND status = 'done'",
      [req.user.id]
    );
    const overdue = await pool.query(
      "SELECT COUNT(*) FROM tasks WHERE assigned_to = $1 AND due_date < NOW() AND status != 'done'",
      [req.user.id]
    );
    res.json({
      total: total.rows[0].count,
      completed: completed.rows[0].count,
      overdue: overdue.rows[0].count
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all tasks for logged in user
router.get('/', auth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT t.*, p.name as project_name, u.name as assigned_to_name
       FROM tasks t
       LEFT JOIN projects p ON t.project_id = p.id
       LEFT JOIN users u ON t.assigned_to = u.id
       WHERE t.assigned_to = $1 OR $2 = 'admin'`,
      [req.user.id, req.user.role]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create task — admin only
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'admin')
    return res.status(403).json({ message: 'Only admins can create tasks' });
  const { title, description, due_date, project_id, assigned_to } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO tasks (title, description, due_date, project_id, assigned_to)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [title, description, due_date, project_id, assigned_to]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update task status — admin or member
router.patch('/:id/status', auth, async (req, res) => {
  const { status } = req.body;
  const validStatuses = ['todo', 'in-progress', 'done'];
  if (!validStatuses.includes(status))
    return res.status(400).json({ message: 'Invalid status' });
  try {
    const result = await pool.query(
      'UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *',
      [status, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;