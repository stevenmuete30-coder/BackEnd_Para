import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
import categoriaRoutes from './routes/categoriaRoutes.js';
import etiquetaRoutes from './routes/etiquetaRoutes.js';
import comentarioRoutes from './routes/comentarioRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('client'));

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/etiquetas', etiquetaRoutes);
app.use('/api/comentarios', comentarioRoutes);

app.get('/api', (req, res) => {
  res.json({ mensaje: 'API del Blog funcionando correctamente' });
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Error interno del servidor',
    mensaje: err.message 
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});