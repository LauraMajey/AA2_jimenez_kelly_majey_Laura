import express from 'express';
import cors from 'cors';
import usuariosRoutes from './routes/usuarios.js';
import tiendasRoutes from './routes/tiendas.js';
import productosRoutes from './routes/productos.js';
import commentRoutes from './routes/comments.js';


const app = express();


app.use(express.json()); 
app.use(cors());        
// Definir las rutas de la API
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/tiendas', tiendasRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/comments', commentRoutes);


const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});