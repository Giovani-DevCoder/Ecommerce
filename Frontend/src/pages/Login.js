import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import iconGoogle from '../assets/logodegoogle.svg';
import SummaryApi from '../common'; // Importa la configuración de la API
import Context from '../context';
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate(); // Usamos navigate para redirigir al usuario
  const { fetchUserDetails } = useContext(Context);

  const [data, setData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  // Manejador de cambios para los inputs
  const handleOnChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Manejador del submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Formulario de login enviado");

    // Enviamos los datos del login al servidor
    try {
      const dataResponse = await fetch(SummaryApi.login.url, { // Usamos la URL de login configurada en SummaryApi
        method: SummaryApi.login.method,
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          rememberMe: data.rememberMe,
        }),
      });

      const responseData = await dataResponse.json();

      if (responseData.success) {
        toast.success(responseData.message)
        // Si la respuesta es exitosa, almacenamos el token y redirigimos al usuario
        localStorage.setItem('authToken', responseData.token); // Almacenar el token JWT en el localStorage
        navigate("/"); // Redirigir a la página de dashboard o alguna página protegida
        fetchUserDetails();
      } else {
        toast.warning(responseData.message)
        // Aquí puedes mostrar un mensaje de error si la autenticación falla
      }
    } catch (error) {
      console.error("Error en la solicitud de login:", error);
      alert('Hubo un error al intentar iniciar sesión. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="flex flex-col">
      <div className="relative flex flex-col m-3 space-y-4 bg-white shadow-xl rounded-2xl md:flex-row md:space-y-0 w-full max-w-md p-6 mx-auto flex-1">
        <div className="flex flex-col justify-center w-full">
          <span className="mb-2 text-3xl font-bold text-center md:text-left">Bienvenido de vuelta</span>
          <span className="font-light text-gray-400 mb-4 text-center md:text-left">
            Inicia sesión para continuar
          </span>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <span className="mb-1 text-sm">Email</span>
                <input
                  type="text"
                  name="email"
                  placeholder="Ingrese su email"
                  className="w-full p-2 text-sm border border-gray-300 rounded-md placeholder:text-xs placeholder:font-light placeholder:text-gray-500"
                  value={data.email}
                  onChange={handleOnChange}
                />
              </div>

              <div>
                <span className="mb-1 text-sm">Contraseña</span>
                <input
                  type="password"
                  name="password"
                  placeholder="Ingrese su contraseña"
                  className="w-full p-2 text-sm border border-gray-300 rounded-md placeholder:text-xs placeholder:font-light placeholder:text-gray-500"
                  value={data.password}
                  onChange={handleOnChange}
                />
              </div>

              <div className="flex justify-between items-center py-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    className="mr-2"
                    checked={data.rememberMe}
                    onChange={handleOnChange}
                  />
                  <label htmlFor="rememberMe" className="text-sm cursor-pointer">
                    Recordar cuenta
                  </label>
                </div>
                <span className="font-bold hover:underline text-sm">
                  <Link to="/forgot-password">Contraseña olvidada</Link>
                </span>
              </div>

              <button 
                type="submit"
                className="w-full px-8 py-3 bg-[#ffcc00] text-[#333] rounded-xl text-lg font-semibold rounded-lg mb-4 hover:bg-yellow-500 hover:text-black hover:border-gray-300 transition-all duration-200"
              >
                Iniciar sesión
              </button>

              <button 
                className="w-full border border-gray-300 text-[#333] rounded-xl text-lg font-semibold p-2 rounded-lg mb-4 hover:bg-black hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <img src={iconGoogle} alt="Google" className="w-6 h-6 inline mr-2" />
                Iniciar sesión con Google
              </button>

              <div className="text-center text-gray-400">
                ¿No tienes una cuenta?
                <span className="font-bold text-black ml-2 hover:underline">
                  <Link to="/sign-up">Regístrate</Link>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;



