// Importación de dependencias
const bcrypt = require('bcryptjs');  // Librería para encriptar y comparar contraseñas
const jwt = require('jsonwebtoken'); // Librería para generar el token JWT
const userModel = require('../../models/userModel');  // Modelo de usuario para interactuar con la base de datos

// Función principal que maneja el inicio de sesión
async function userLoginController(req, res) {
  try {
    // Desestructuramos email y password del cuerpo de la solicitud (req.body)
    const { email, password } = req.body; 

    // Verificamos si los campos email y password fueron proporcionados
    if (!email || !password) {
      return res.status(400).json({ message: 'Enter a valid email and password' });
    }

    // Buscamos al usuario en la base de datos
    const user = await userModel.findOne({ email });
    
    // Si no encontramos al usuario, retornamos un error 401 (no autorizado)
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Comparamos la contraseña proporcionada con la contraseña encriptada en la base de datos
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    
    // Si las contraseñas no coinciden, retornamos un error 401 (contraseña incorrecta)
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Si las credenciales son correctas, generamos un JWT con la información del usuario
    // Aquí estamos usando la clave secreta 'secretKey' y estableciendo el tiempo de expiración del token a 1 hora
    const token = jwt.sign(
      { _userId: user._id, email: user.email, role: user.role }, // Información que se incluirá en el token
      process.env.TOKEN_SECRET_KEY, // Clave secreta para firmar el token
      { expiresIn: '1h' } // El token expirará en 1 hora
    );

    const tokenOption = {
      httpOnly : true,
      secure : true
    }

    // Respondemos con un mensaje de éxito, el token generado y los detalles del usuario
    res.cookie("token",token,tokenOption).json({
      success: true,
      message: 'Login successful',
      token, // El token JWT que el cliente utilizará para futuras solicitudes
      user: { email: user.email, role: user.role }, // Información básica del usuario
    });
    
  } catch (err) {
    // Si ocurre un error durante el proceso, lo capturamos y respondemos con un error genérico
    console.error(err); // Mostramos el error en la consola para fines de depuración
    res.status(500).json({ message: 'Server error' }); // Respuesta de error del servidor
  }
}

// Exportamos el controlador para que pueda ser utilizado en otros archivos
module.exports = userLoginController;


