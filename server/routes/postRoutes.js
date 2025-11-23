import express from 'express';
import {
  crearPost,
  obtenerPosts,
  obtenerPost,
  obtenerPostsPorCategoria,
  obtenerPostsPorUsuario,
  actualizarPost,
  eliminarPost,
  agregarEtiquetaAPost,
  eliminarEtiquetaDePost
} from '../controllers/postController.js';

const router = express.Router();

router.get('/', obtenerPosts);
router.get('/:id', obtenerPost);
router.get('/categoria/:categoriaId', obtenerPostsPorCategoria);
router.get('/usuario/:usuarioId', obtenerPostsPorUsuario);
router.post('/', crearPost);
router.put('/:id', actualizarPost);
router.delete('/:id', eliminarPost);
router.post('/:id/etiquetas', agregarEtiquetaAPost);
router.delete('/:post_id/etiquetas/:etiqueta_id', eliminarEtiquetaDePost);

export default router;