import express from 'express';
import pool from '../db.js';
import bcrypt from 'bcrypt';

const router = express.Router();

// Crear usuario (registro)
router.post('/', async (req, res) => {
  const { nombre, correo, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO usuarios (nombre, correo, password) VALUES (?, ?, ?)',
      [nombre, correo, hashedPassword]
    );
    res.json({ id: result.insertId, nombre, correo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login de usuario
router.post('/login', async (req, res) => {
  const { correo, password } = req.body;
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
    if (rows.length === 0) return res.status(401).json({ error: 'Usuario no encontrado' });

    const usuario = rows[0];
    const match = await bcrypt.compare(password, usuario.password);
    if (!match) return res.status(401).json({ error: 'Contraseña incorrecta' });

    res.json({ message: 'Login exitoso', usuario: { id: usuario.id, nombre: usuario.nombre, correo: usuario.correo } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Listar usuarios
router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT id, nombre, correo FROM usuarios');
  res.json(rows);
});

// Actualizar usuario
router.put('/:id', async (req, res) => {
  const { nombre, correo } = req.body;
  await pool.query('UPDATE usuarios SET nombre=?, correo=? WHERE id=?', [nombre, correo, req.params.id]);
  res.json({ message: 'Usuario actualizado' });
});

// Eliminar usuario
router.delete('/:id', async (req, res) => {
  await pool.query('DELETE FROM usuarios WHERE id=?', [req.params.id]);
  res.json({ message: 'Usuario eliminado' });
});

export default router;
