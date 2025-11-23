import pool from '../config/database.js';

class Usuario {
  static async crear(login, password, nickname, email) {
    const [result] = await pool.execute(
      'INSERT INTO usuarios (login, password, nickname, email) VALUES (?, ?, ?, ?)',
      [login, password, nickname, email]
    );
    return result.insertId;
  }

  static async buscarPorEmail(email) {
    const [rows] = await pool.execute(
      'SELECT * FROM usuarios WHERE email = ?',
      [email]
    );
    return rows[0];
  }

  static async buscarPorLogin(login) {
    const [rows] = await pool.execute(
      'SELECT * FROM usuarios WHERE login = ?',
      [login]
    );
    return rows[0];
  }

  static async buscarPorId(id) {
    const [rows] = await pool.execute(
      'SELECT id, login, nickname, email FROM usuarios WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  static async obtenerTodos() {
    const [rows] = await pool.execute(
      'SELECT id, login, nickname, email FROM usuarios'
    );
    return rows;
  }

  static async actualizar(id, datos) {
    const campos = [];
    const valores = [];

    if (datos.nickname) {
      campos.push('nickname = ?');
      valores.push(datos.nickname);
    }
    if (datos.email) {
      campos.push('email = ?');
      valores.push(datos.email);
    }
    if (datos.password) {
      campos.push('password = ?');
      valores.push(datos.password);
    }

    valores.push(id);

    const [result] = await pool.execute(
      `UPDATE usuarios SET ${campos.join(', ')} WHERE id = ?`,
      valores
    );
    return result.affectedRows;
  }

  static async eliminar(id) {
    const [result] = await pool.execute(
      'DELETE FROM usuarios WHERE id = ?',
      [id]
    );
    return result.affectedRows;
  }
}

export default Usuario;