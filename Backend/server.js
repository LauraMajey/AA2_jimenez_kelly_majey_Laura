import express from 'express';
import cors from 'cors';
import usuariosRoutes from './routes/usuarios.js';
import tiendasRoutes from './routes/tiendas.js';
import productosRoutes from './routes/productos.js';

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/tiendas', tiendasRoutes);
app.use('/api/productos', productosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
