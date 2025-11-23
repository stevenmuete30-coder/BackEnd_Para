import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

export const esAutorDelRecurso = (modeloCallback) => {
  return async (req, res, next) => {
    try {
      const recurso = await modeloCallback(req.params.id);
      
      if (!recurso) {
        return res.status(404).json({ error: 'Recurso no encontrado' });
      }

      if (recurso.usuario_id !== req.usuario.id) {
        return res.status(403).json({ error: 'No tienes permiso para realizar esta acción' });
      }

      req.recurso = recurso;
      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};