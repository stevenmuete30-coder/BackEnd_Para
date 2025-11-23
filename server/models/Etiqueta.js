import pool from '../config/database.js';

class Etiqueta {
  static async crear(nombre_etiqueta) {
    const [result] = await pool.execute(
      'INSERT INTO etiquetas (nombre_etiqueta) VALUES (?)',
      [nombre_etiqueta]
    );
    return result.insertId;
  }

  static async obtenerTodas() {
    const [rows] = await pool.execute(
      'SELECT * FROM etiquetas ORDER BY nombre_etiqueta'
    );
    return rows;
  }

  static async buscarPorId(id) {
    const [rows] = await pool.execute(
      'SELECT * FROM etiquetas WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  static async actualizar(id, nombre_etiqueta) {
    const [result] = await pool.execute(
      'UPDATE etiquetas SET nombre_etiqueta = ? WHERE id = ?',
      [nombre_etiqueta, id]
    );
    return result.affectedRows;
  }

  static async eliminar(id) {
    const [result] = await pool.execute(
      'DELETE FROM etiquetas WHERE id = ?',
      [id]
    );
    return result.affectedRows;
  }
}

export default Etiqueta;