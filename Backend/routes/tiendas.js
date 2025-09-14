import express from 'express';
import pool from '../db.js';

const router = express.Router();


router.post('/', async (req, res) => {
  const { image } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO tiendas (image) VALUES (?)',
      [image]
    );
    res.status(201).json({ id: result.insertId, image });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la tienda', error: error.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tiendas');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las tiendas', error: error.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tiendas WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Tienda no encontrada' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la tienda', error: error.message });
  }
});


router.put('/:id', async (req, res) => {
  const { image } = req.body;
  try {
    await pool.query(
      'UPDATE tiendas SET image=? WHERE id=?',
      [image, req.params.id]
    );
    res.json({ message: 'Tienda actualizada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la tienda', error: error.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM tiendas WHERE id=?', [req.params.id]);
    res.json({ message: 'Tienda eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la tienda', error: error.message });
  }
});

export default router;