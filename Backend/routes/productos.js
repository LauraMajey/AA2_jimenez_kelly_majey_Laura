import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Crear producto
router.post('/', async (req, res) => {
  const { nombre, descripcion, precio, stock, tienda_id } = req.body;
  const [result] = await pool.query(
    'INSERT INTO productos (nombre, descripcion, precio, stock, tienda_id) VALUES (?, ?, ?, ?, ?)',
    [nombre, descripcion, precio, stock, tienda_id]
  );
  res.json({ id: result.insertId, nombre, descripcion, precio, stock, tienda_id });
});

// Listar productos
router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM productos');
  res.json(rows);
});

// Actualizar producto
router.put('/:id', async (req, res) => {
  const { nombre, descripcion, precio, stock, tienda_id } = req.body;
  await pool.query(
    'UPDATE productos SET nombre=?, descripcion=?, precio=?, stock=?, tienda_id=? WHERE id=?',
    [nombre, descripcion, precio, stock, tienda_id, req.params.id]
  );
  res.json({ message: 'Producto actualizado' });
});

// Eliminar producto
router.delete('/:id', async (req, res) => {
  await pool.query('DELETE FROM productos WHERE id=?', [req.params.id]);
  res.json({ message: 'Producto eliminado' });
});

export default router;
