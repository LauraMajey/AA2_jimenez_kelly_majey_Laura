import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import usuariosRoutes from './routes/usuarios.js';
import tiendasRoutes from './routes/tiendas.js';
import productosRoutes from './routes/productos.js';
import commentRoutes from './routes/comments.js';
import marcasRoutes from './routes/marcas.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors());


app.use('/products', express.static(path.join(__dirname, 'public/products')));
app.use('/stores', express.static(path.join(__dirname, 'public/stores')));

// Rutas API
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/tiendas', tiendasRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/marcas', marcasRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
