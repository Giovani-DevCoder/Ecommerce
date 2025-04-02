const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
  try {
    const token = req.cookies?.token;

    console.log("Token recibido:", token);

    if (!token) {
      return res.status(401).json({
        message: "Please log in...",
        error: true,
        success: false,
        data: []
      });
    }

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err, decoded) {
      if (err) {
        console.log("Error al verificar el token:", err);
        return res.status(403).json({
          message: "Token inválido o expirado",
          error: true,
          success: false,
          data: []
        });
      }

      console.log("Token decodificado:", decoded);

      if (!decoded || !decoded._userId) {
        return res.status(403).json({
          message: "Token no contiene un userId válido",
          error: true,
          success: false,
          data: []
        });
      }

      req.userId = decoded._userId;
      next();
    });
  } catch (err) {
    console.log("Error en el middleware de autenticación:", err);
    res.status(500).json({
      message: err.message || "Error interno del servidor",
      data: [],
      error: true,
      success: false
    });
  }
}

module.exports = authToken;