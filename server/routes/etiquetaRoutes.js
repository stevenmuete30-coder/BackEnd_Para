import express from 'express';
import {
  crearEtiqueta,
  obtenerEtiquetas,
  obtenerEtiqueta,
  actualizarEtiqueta,
  eliminarEtiqueta
} from '../controllers/etiquetaController.js';

const router = express.Router();

router.get('/', obtenerEtiquetas);
router.get('/:id', obtenerEtiqueta);
router.post('/', crearEtiqueta);
router.put('/:id', actualizarEtiqueta);
router.delete('/:id', eliminarEtiqueta);

export default router;