import express from 'express';
import pool from '../db.js'; // tu configuración de conexión a la base de datos

const router = express.Router();

// Crear comentario
router.post('/', async (req, res) => {
  try {
    const { product_id, text } = req.body;
    const [result] = await pool.query(
      'INSERT INTO comments (product_id, text) VALUES (?, ?)',
      [product_id, text]
    );
    res.json({
      id: result.insertId,
      product_id,
      text,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear comentario' });
  }
});

// Obtener comentarios por producto
router.get('/product/:productId', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM comments WHERE product_id = ? ORDER BY timestamp DESC',
      [req.params.productId]
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener comentarios' });
  }
});

// Eliminar comentario
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM comments WHERE id = ?', [req.params.id]);
    res.json({ message: 'Comentario eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar comentario' });
  }
});

export default router;
