import pool from '../config/database.js';

class Post {
  static async crear(titulo, contenido, usuario_id, categoria_id) {
    const [result] = await pool.execute(
      'INSERT INTO posts (titulo, fecha_publicacion, contenido, estatus, usuario_id, categoria_id) VALUES (?, NOW(), ?, ?, ?, ?)',
      [titulo, contenido, 'activo', usuario_id, categoria_id]
    );
    return result.insertId;
  }

  static async obtenerTodos(limite = 50, offset = 0) {
    const limiteInt = parseInt(limite);
    const offsetInt = parseInt(offset);
    
    const [rows] = await pool.query(
      `SELECT p.*, u.nickname as autor, c.nombre_categoria as categoria
       FROM posts p
       LEFT JOIN usuarios u ON p.usuario_id = u.id
       LEFT JOIN categorias c ON p.categoria_id = c.id
       WHERE p.estatus = 'activo'
       ORDER BY p.fecha_publicacion DESC
       LIMIT ${limiteInt} OFFSET ${offsetInt}`
    );
    return rows;
  }

  static async buscarPorId(id) {
    const [rows] = await pool.execute(
      `SELECT p.*, u.nickname as autor, u.email as autor_email, c.nombre_categoria as categoria
       FROM posts p
       LEFT JOIN usuarios u ON p.usuario_id = u.id
       LEFT JOIN categorias c ON p.categoria_id = c.id
       WHERE p.id = ?`,
      [id]
    );
    return rows[0];
  }

  static async obtenerPorUsuario(usuario_id) {
    const [rows] = await pool.execute(
      `SELECT p.*, c.nombre_categoria as categoria
       FROM posts p
       LEFT JOIN categorias c ON p.categoria_id = c.id
       WHERE p.usuario_id = ?
       ORDER BY p.fecha_publicacion DESC`,
      [usuario_id]
    );
    return rows;
  }

  static async obtenerPorCategoria(categoria_id) {
    const [rows] = await pool.execute(
      `SELECT p.*, u.nickname as autor, c.nombre_categoria as categoria
       FROM posts p
       LEFT JOIN usuarios u ON p.usuario_id = u.id
       LEFT JOIN categorias c ON p.categoria_id = c.id
       WHERE p.categoria_id = ? AND p.estatus = 'activo'
       ORDER BY p.fecha_publicacion DESC`,
      [categoria_id]
    );
    return rows;
  }

  static async actualizar(id, datos) {
    const campos = [];
    const valores = [];

    if (datos.titulo) {
      campos.push('titulo = ?');
      valores.push(datos.titulo);
    }
    if (datos.contenido) {
      campos.push('contenido = ?');
      valores.push(datos.contenido);
    }
    if (datos.categoria_id) {
      campos.push('categoria_id = ?');
      valores.push(datos.categoria_id);
    }
    if (datos.estatus) {
      campos.push('estatus = ?');
      valores.push(datos.estatus);
    }

    valores.push(id);

    const [result] = await pool.execute(
      `UPDATE posts SET ${campos.join(', ')} WHERE id = ?`,
      valores
    );
    return result.affectedRows;
  }

  static async eliminar(id) {
    const [result] = await pool.execute(
      'UPDATE posts SET estatus = ? WHERE id = ?',
      ['inactivo', id]
    );
    return result.affectedRows;
  }

  static async agregarEtiqueta(post_id, etiqueta_id) {
    const [result] = await pool.execute(
      'INSERT INTO posts_etiquetas (post_id, etiqueta_id) VALUES (?, ?)',
      [post_id, etiqueta_id]
    );
    return result.insertId;
  }

  static async obtenerEtiquetas(post_id) {
    const [rows] = await pool.execute(
      `SELECT e.* FROM etiquetas e
       INNER JOIN posts_etiquetas pe ON e.id = pe.etiqueta_id
       WHERE pe.post_id = ?`,
      [post_id]
    );
    return rows;
  }

  static async eliminarEtiqueta(post_id, etiqueta_id) {
    const [result] = await pool.execute(
      'DELETE FROM posts_etiquetas WHERE post_id = ? AND etiqueta_id = ?',
      [post_id, etiqueta_id]
    );
    return result.affectedRows;
  }
}

export default Post;