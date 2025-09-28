import express from 'express';
import pool from '../db.js'; 

const router = express.Router();

// GET all marcas
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM marcas ORDER BY nombre');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching marcas:', err);
    res.status(500).json({ message: 'Error fetching marcas' });
  }
});

// GET marca by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM marcas WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Marca not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching marca:', err);
    res.status(500).json({ message: 'Error fetching marca' });
  }
});

// POST create new marca
router.post('/', async (req, res) => {
  const { nombre } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO marcas (nombre) VALUES (?)', [nombre]);
    res.status(201).json({ id: result.insertId, nombre });
  } catch (err) {
    console.error('Error creating marca:', err);
    res.status(500).json({ message: 'Error creating marca' });
  }
});

// PUT update marca
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    const [result] = await pool.query('UPDATE marcas SET nombre = ? WHERE id = ?', [nombre, id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Marca not found' });
    res.json({ id, nombre });
  } catch (err) {
    console.error('Error updating marca:', err);
    res.status(500).json({ message: 'Error updating marca' });
  }
});

// DELETE marca
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM marcas WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Marca not found' });
    res.json({ message: 'Marca deleted' });
  } catch (err) {
    console.error('Error deleting marca:', err);
    res.status(500).json({ message: 'Error deleting marca' });
  }
});

export default router;
