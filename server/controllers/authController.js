import Usuario from '../models/Usuario.js';

export const registro = async (req, res) => {
  try {
    const { login, password, nickname, email } = req.body;

    if (!login || !password || !nickname || !email) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    const usuarioExistente = await Usuario.buscarPorEmail(email);
    if (usuarioExistente) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    const loginExistente = await Usuario.buscarPorLogin(login);
    if (loginExistente) {
      return res.status(400).json({ error: 'El login ya está en uso' });
    }

    const userId = await Usuario.crear(login, password, nickname, email);

    res.status(201).json({
      mensaje: 'Usuario creado exitosamente',
      userId
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { login, password } = req.body;

    if (!login || !password) {
      return res.status(400).json({ error: 'Login y password son requeridos' });
    }

    const usuario = await Usuario.buscarPorLogin(login);
    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    if (usuario.password !== password) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    res.json({
      mensaje: 'Login exitoso',
      usuario: {
        id: usuario.id,
        login: usuario.login,
        nickname: usuario.nickname,
        email: usuario.email
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.obtenerTodos();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};