import pool from '../config/database.js';

class Comentario {
  static async crear(cuerpo_comentario, usuario_id, post_id) {
    const [result] = await pool.execute(
      'INSERT INTO comentarios (cuerpo_comentario, usuario_id, post_id) VALUES (?, ?, ?)',
      [cuerpo_comentario, usuario_id, post_id]
    );
    return result.insertId;
  }

  static async obtenerPorPost(post_id) {
    const [rows] = await pool.execute(
      `SELECT c.*, u.nickname as autor
       FROM comentarios c
       INNER JOIN usuarios u ON c.usuario_id = u.id
       WHERE c.post_id = ?
       ORDER BY c.id DESC`,
      [post_id]
    );
    return rows;
  }

  static async buscarPorId(id) {
    const [rows] = await pool.execute(
      `SELECT c.*, u.nickname as autor
       FROM comentarios c
       INNER JOIN usuarios u ON c.usuario_id = u.id
       WHERE c.id = ?`,
      [id]
    );
    return rows[0];
  }

  static async actualizar(id, cuerpo_comentario) {
    const [result] = await pool.execute(
      'UPDATE comentarios SET cuerpo_comentario = ? WHERE id = ?',
      [cuerpo_comentario, id]
    );
    return result.affectedRows;
  }

  static async eliminar(id) {
    const [result] = await pool.execute(
      'DELETE FROM comentarios WHERE id = ?',
      [id]
    );
    return result.affectedRows;
  }
}

export default Comentario;