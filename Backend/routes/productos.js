import express from 'express';
import pool from '../db.js'; // tu configuración de conexión a la base de datos

const router = express.Router();

// Crear producto
router.post('/', async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, tienda_id } = req.body;
    const [result] = await pool.query(
      'INSERT INTO productos (nombre, descripcion, precio, stock, tienda_id) VALUES (?, ?, ?, ?, ?)',
      [nombre, descripcion, precio, stock, tienda_id]
    );
    res.json({ id: result.insertId, nombre, descripcion, precio, stock, tienda_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear producto' });
  }
});

// Listar todos los productos
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM productos');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener productos' });
  }
});

// Obtener producto por ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM productos WHERE id = ?', [req.params.id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener producto' });
  }
});

// Actualizar producto
router.put('/:id', async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, tienda_id } = req.body;
    await pool.query(
      'UPDATE productos SET nombre=?, descripcion=?, precio=?, stock=?, tienda_id=? WHERE id=?',
      [nombre, descripcion, precio, stock, tienda_id, req.params.id]
    );
    res.json({ message: 'Producto actualizado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar producto' });
  }
});

// Eliminar producto
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM productos WHERE id=?', [req.params.id]);
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar producto' });
  }
});

export default router;
