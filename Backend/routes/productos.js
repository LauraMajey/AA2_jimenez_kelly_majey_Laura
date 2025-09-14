import express from 'express';
import pool from '../db.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const router = express.Router();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const imagePath = path.join(__dirname, '..', '..', 'Frontend', 'public', 'products');
if (!fs.existsSync(imagePath)) {
  fs.mkdirSync(imagePath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, imagePath),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });



router.post('/', upload.single('image'), async (req, res) => {
  try {
    const {name, description, price, stock,tienda_id,brand,type,release_date, link } = req.body;

    const image_url = req.file ? `products/${req.file.filename}` : null;

    const [result] = await pool.query(
      `INSERT INTO productos 
      (name, description, price, stock, tienda_id, brand, type, release_date, link, image_url) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, description, price, stock, tienda_id, brand, type, release_date, link, image_url]
    );

    res.json({id: result.insertId, name, description,  price, stock,  tienda_id,  brand,  type,  release_date,  link,  image_url });
  } catch (error) {
    console.error(' Error al crear producto:', error);
    res.status(500).json({ message: 'Error al crear producto' });
  }
});



router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM productos');
    res.json(rows);
  } catch (error) {
    console.error(' Error al obtener productos:', error);
    res.status(500).json({ message: 'Error al obtener productos' });
  }
});



router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM productos WHERE id = ?', [req.params.id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error(' Error al obtener producto:', error);
    res.status(500).json({ message: 'Error al obtener producto' });
  }
});



router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const {  name,  description,  price,  stock,  tienda_id,  brand,  type,  release_date,  link,  image_url: existingImage} = req.body;

    const image_url = req.file ? `products/${req.file.filename}` : existingImage;

    await pool.query(
      `UPDATE productos SET 
      name=?, description=?, price=?, stock=?, tienda_id=?, brand=?, type=?, release_date=?, link=?, image_url=? 
      WHERE id=?`,
      [name, description, price, stock, tienda_id, brand, type, release_date, link, image_url, req.params.id]
    );

    res.json({ message: 'Producto actualizado', image_url });
  } catch (error) {
    console.error(' Error al actualizar producto:', error);
    res.status(500).json({ message: 'Error al actualizar producto' });
  }
});



router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM productos WHERE id = ?', [req.params.id]);
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    console.error(' Error al eliminar producto:', error);
    res.status(500).json({ message: 'Error al eliminar producto' });
  }
});

export default router;
