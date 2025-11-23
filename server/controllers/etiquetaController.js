import Etiqueta from '../models/Etiqueta.js';

export const crearEtiqueta = async (req, res) => {
  try {
    const { nombre_etiqueta } = req.body;

    if (!nombre_etiqueta) {
      return res.status(400).json({ error: 'Nombre de etiqueta es requerido' });
    }

    const etiquetaId = await Etiqueta.crear(nombre_etiqueta);

    res.status(201).json({
      mensaje: 'Etiqueta creada exitosamente',
      etiquetaId
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerEtiquetas = async (req, res) => {
  try {
    const etiquetas = await Etiqueta.obtenerTodas();
    res.json(etiquetas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerEtiqueta = async (req, res) => {
  try {
    const etiqueta = await Etiqueta.buscarPorId(req.params.id);
    
    if (!etiqueta) {
      return res.status(404).json({ error: 'Etiqueta no encontrada' });
    }

    res.json(etiqueta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const actualizarEtiqueta = async (req, res) => {
  try {
    const { nombre_etiqueta } = req.body;

    if (!nombre_etiqueta) {
      return res.status(400).json({ error: 'Nombre de etiqueta es requerido' });
    }

    await Etiqueta.actualizar(req.params.id, nombre_etiqueta);

    res.json({ mensaje: 'Etiqueta actualizada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const eliminarEtiqueta = async (req, res) => {
  try {
    await Etiqueta.eliminar(req.params.id);
    res.json({ mensaje: 'Etiqueta eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};