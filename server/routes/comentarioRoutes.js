import express from 'express';
import {
  crearComentario,
  obtenerComentariosPorPost,
  actualizarComentario,
  eliminarComentario
} from '../controllers/comentarioController.js';

const router = express.Router();

router.get('/post/:postId', obtenerComentariosPorPost);
router.post('/', crearComentario);
router.put('/:id', actualizarComentario);
router.delete('/:id', eliminarComentario);

export default router;