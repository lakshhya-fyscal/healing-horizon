import { Router } from 'express';
import { pool } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

export const assetsRouter = Router();
assetsRouter.use(requireAuth);

assetsRouter.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, name, type, status, date_label AS date, content, created_at
       FROM assets WHERE user_id = $1 ORDER BY created_at DESC`,
      [req.user.id]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

assetsRouter.post('/', async (req, res) => {
  const { name, type, content, date } = req.body;
  if (!name || !type) return res.status(400).json({ error: 'name and type required' });
  try {
    const { rows } = await pool.query(
      `INSERT INTO assets (user_id, name, type, content, date_label)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, type, status, date_label AS date, content`,
      [req.user.id, name, type, content, date]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

assetsRouter.put('/:id', async (req, res) => {
  const { status } = req.body;
  if (!status) return res.status(400).json({ error: 'status required' });
  try {
    const { rows } = await pool.query(
      `UPDATE assets SET status = $1
       WHERE id = $2 AND user_id = $3
       RETURNING id, name, type, status, date_label AS date`,
      [status, req.params.id, req.user.id]
    );
    if (!rows.length) return res.status(404).json({ error: 'Asset not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

assetsRouter.delete('/:id', async (req, res) => {
  try {
    await pool.query(
      'DELETE FROM assets WHERE id = $1 AND user_id = $2',
      [req.params.id, req.user.id]
    );
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});
