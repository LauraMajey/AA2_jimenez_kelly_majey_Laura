import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Crear tienda
router.post('/', async (req, res) => {
  const { nombre, direccion, telefono } = req.body;
  const [result] = await pool.query(
    'INSERT INTO tiendas (nombre, direccion, telefono) VALUES (?, ?, ?)',
    [nombre, direccion, telefono]
  );
  res.json({ id: result.insertId, nombre, direccion, telefono });
});

// Listar tiendas
router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM tiendas');
  res.json(rows);
});

// Actualizar tienda
router.put('/:id', async (req, res) => {
  const { nombre, direccion, telefono } = req.body;
  await pool.query(
    'UPDATE tiendas SET nombre=?, direccion=?, telefono=? WHERE id=?',
    [nombre, direccion, telefono, req.params.id]
  );
  res.json({ message: 'Tienda actualizada' });
});

// Eliminar tienda
router.delete('/:id', async (req, res) => {
  await pool.query('DELETE FROM tiendas WHERE id=?', [req.params.id]);
  res.json({ message: 'Tienda eliminada' });
});

export default router;
