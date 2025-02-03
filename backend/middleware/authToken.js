const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(200).json({
        message: "Sesión no iniciada",
        error: true,
        success: false
      });
    }

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err, decoded) {
      if (err) {
        console.log("Error en la verificación del token:", err);
        return res.status(403).json({
          message: "Token inválido o expirado",
          error: true,
          success: false
        });
      }

      console.log("Token decodificado:", decoded); // Agrega esta línea para ver el contenido

      if (!decoded || !decoded._userId) {
        return res.status(403).json({
          message: "Token no contiene un userId válido",
          error: true,
          success: false
        });
      }

      req.userId = decoded._userId;
      next();
    });
  } catch (err) {
    console.log("Error en el middleware de autenticación:", err);
    res.status(400).json({
      message: err.message || err,
      data: [],
      error: true,
      success: false
    });
  }
}

module.exports = authToken;


