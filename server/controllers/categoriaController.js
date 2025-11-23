import Categoria from '../models/Categoria.js';

export const crearCategoria = async (req, res) => {
  try {
    const { nombre_categoria } = req.body;

    if (!nombre_categoria) {
      return res.status(400).json({ error: 'Nombre de categoría es requerido' });
    }

    const categoriaId = await Categoria.crear(nombre_categoria);

    res.status(201).json({
      mensaje: 'Categoría creada exitosamente',
      categoriaId
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.obtenerTodas();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerCategoria = async (req, res) => {
  try {
    const categoria = await Categoria.buscarPorId(req.params.id);
    
    if (!categoria) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    res.json(categoria);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const actualizarCategoria = async (req, res) => {
  try {
    const { nombre_categoria } = req.body;

    if (!nombre_categoria) {
      return res.status(400).json({ error: 'Nombre de categoría es requerido' });
    }

    await Categoria.actualizar(req.params.id, nombre_categoria);

    res.json({ mensaje: 'Categoría actualizada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const eliminarCategoria = async (req, res) => {
  try {
    await Categoria.eliminar(req.params.id);
    res.json({ mensaje: 'Categoría eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};