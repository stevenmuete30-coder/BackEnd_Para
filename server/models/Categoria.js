import pool from '../config/database.js';

class Categoria {
  static async crear(nombre_categoria) {
    const [result] = await pool.execute(
      'INSERT INTO categorias (nombre_categoria) VALUES (?)',
      [nombre_categoria]
    );
    return result.insertId;
  }

  static async obtenerTodas() {
    const [rows] = await pool.execute(
      'SELECT * FROM categorias ORDER BY nombre_categoria'
    );
    return rows;
  }

  static async buscarPorId(id) {
    const [rows] = await pool.execute(
      'SELECT * FROM categorias WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  static async actualizar(id, nombre_categoria) {
    const [result] = await pool.execute(
      'UPDATE categorias SET nombre_categoria = ? WHERE id = ?',
      [nombre_categoria, id]
    );
    return result.affectedRows;
  }

  static async eliminar(id) {
    const [result] = await pool.execute(
      'DELETE FROM categorias WHERE id = ?',
      [id]
    );
    return result.affectedRows;
  }
}

export default Categoria;