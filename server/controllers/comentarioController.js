import Comentario from '../models/Comentario.js';

export const crearComentario = async (req, res) => {
  try {
    const { cuerpo_comentario, post_id, usuario_id } = req.body;

    if (!cuerpo_comentario || !post_id || !usuario_id) {
      return res.status(400).json({ error: 'Cuerpo del comentario, post_id y usuario_id son requeridos' });
    }

    const comentarioId = await Comentario.crear(cuerpo_comentario, usuario_id, post_id);

    res.status(201).json({
      mensaje: 'Comentario creado exitosamente',
      comentarioId
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerComentariosPorPost = async (req, res) => {
  try {
    const comentarios = await Comentario.obtenerPorPost(req.params.postId);
    res.json(comentarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const actualizarComentario = async (req, res) => {
  try {
    const { cuerpo_comentario } = req.body;
    const comentario = await Comentario.buscarPorId(req.params.id);

    if (!comentario) {
      return res.status(404).json({ error: 'Comentario no encontrado' });
    }

    await Comentario.actualizar(req.params.id, cuerpo_comentario);

    res.json({ mensaje: 'Comentario actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const eliminarComentario = async (req, res) => {
  try {
    const comentario = await Comentario.buscarPorId(req.params.id);

    if (!comentario) {
      return res.status(404).json({ error: 'Comentario no encontrado' });
    }

    await Comentario.eliminar(req.params.id);

    res.json({ mensaje: 'Comentario eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};