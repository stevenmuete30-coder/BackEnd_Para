import Post from '../models/Post.js';

export const crearPost = async (req, res) => {
  try {
    const { titulo, contenido, categoria_id, usuario_id } = req.body;

    if (!titulo || !contenido || !usuario_id) {
      return res.status(400).json({ error: 'Título, contenido y usuario_id son requeridos' });
    }
    categoria_id: categoria_id || null

    const postId = await Post.crear(titulo, contenido, usuario_id, categoria_id);

    res.status(201).json({
      mensaje: 'Post creado exitosamente',
      postId
    });
  } catch (error) {
    console.error('Error en crearPost:', error);
    res.status(500).json({ error: error.message });
  }
};

export const obtenerPosts = async (req, res) => {
  try {
    const limite = parseInt(req.query.limite) || 50;
    const pagina = parseInt(req.query.pagina) || 1;
    const offset = (pagina - 1) * limite;

    console.log('Obteniendo posts - limite:', limite, 'offset:', offset);
    const posts = await Post.obtenerTodos(limite, offset);
    console.log('Posts obtenidos:', posts.length);
    
    res.json(posts);
  } catch (error) {
    console.error('Error en obtenerPosts:', error);
    res.status(500).json({ error: error.message });
  }
};

export const obtenerPost = async (req, res) => {
  try {
    const post = await Post.buscarPorId(req.params.id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    const etiquetas = await Post.obtenerEtiquetas(post.id);
    post.etiquetas = etiquetas;

    res.json(post);
  } catch (error) {
    console.error('Error en obtenerPost:', error);
    res.status(500).json({ error: error.message });
  }
};

export const obtenerPostsPorCategoria = async (req, res) => {
  try {
    const posts = await Post.obtenerPorCategoria(req.params.categoriaId);
    res.json(posts);
  } catch (error) {
    console.error('Error en obtenerPostsPorCategoria:', error);
    res.status(500).json({ error: error.message });
  }
};

export const obtenerPostsPorUsuario = async (req, res) => {
  try {
    const posts = await Post.obtenerPorUsuario(req.params.usuarioId);
    res.json(posts);
  } catch (error) {
    console.error('Error en obtenerPostsPorUsuario:', error);
    res.status(500).json({ error: error.message });
  }
};

export const actualizarPost = async (req, res) => {
  try {
    const { titulo, contenido, categoria_id, estatus } = req.body;
    const post = await Post.buscarPorId(req.params.id);

    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    await Post.actualizar(req.params.id, { titulo, contenido, categoria_id, estatus });

    res.json({ mensaje: 'Post actualizado exitosamente' });
  } catch (error) {
    console.error('Error en actualizarPost:', error);
    res.status(500).json({ error: error.message });
  }
};

export const eliminarPost = async (req, res) => {
  try {
    const post = await Post.buscarPorId(req.params.id);

    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    await Post.eliminar(req.params.id);

    res.json({ mensaje: 'Post eliminado exitosamente' });
  } catch (error) {
    console.error('Error en eliminarPost:', error);
    res.status(500).json({ error: error.message });
  }
};

export const agregarEtiquetaAPost = async (req, res) => {
  try {
    const { etiqueta_id } = req.body;
    const post_id = req.params.id;

    await Post.agregarEtiqueta(post_id, etiqueta_id);

    res.json({ mensaje: 'Etiqueta agregada al post' });
  } catch (error) {
    console.error('Error en agregarEtiquetaAPost:', error);
    res.status(500).json({ error: error.message });
  }
};

export const eliminarEtiquetaDePost = async (req, res) => {
  try {
    const { post_id, etiqueta_id } = req.params;

    await Post.eliminarEtiqueta(post_id, etiqueta_id);

    res.json({ mensaje: 'Etiqueta eliminada del post' });
  } catch (error) {
    console.error('Error en eliminarEtiquetaDePost:', error);
    res.status(500).json({ error: error.message });
  }
};