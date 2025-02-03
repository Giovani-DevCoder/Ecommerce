import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import iconGoogle from '../assets/logodegoogle.svg';
import SummaryApi from '../common';
import { toast } from 'sonner';

const SignUp = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const navigate = useNavigate(); // Inicializar el hook navigate

  const handleOnChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password === data.confirmPassword) {
      try {
        console.log("SummaryApi.signUP.url", SummaryApi.signUP.url);

        // Realizamos la solicitud para crear la cuenta
        const dataResponse = await fetch(SummaryApi.signUP.url, {
          method: SummaryApi.signUP.method,
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data), // Enviamos los datos del formulario
        });

        // Parseamos la respuesta del servidor
        const responseData = await dataResponse.json();

        if(responseData.success){
          toast.success(responseData.message)
        };
        if(responseData.error){
          toast.warning(responseData.message)
        };

        // Verificamos si la creación fue exitosa
        if (responseData.success) {
          // Si la creación es exitosa, redirigimos al login
          console.log("Cuenta creada con éxito");
          navigate("/login"); // Redirigir al login
        } else {
          // Si hay algún error, mostramos el mensaje de error
          console.log("Error al crear la cuenta", responseData.message);
        }
        
      } catch (error) {
        // Si ocurre un error en la solicitud, lo capturamos
        console.error("Error en la solicitud:", error);
      }
    } else {
      console.log("Las contraseñas no coinciden");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="relative flex flex-col m-3 space-y-4 bg-white shadow-xl rounded-2xl md:flex-row md:space-y-0 w-full max-w-md p-6 mx-auto flex-1">
        <div className="flex flex-col justify-center w-full">
          <span className="mb-2 text-3xl font-bold text-center md:text-left">¡Únete ahora!</span>
          <span className="font-light text-gray-400 mb-4 text-center md:text-left">
            Crea una cuenta para comenzar
          </span>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <span className="mb-1 text-sm">Nombre</span>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Ingresa tu nombre"
                    value={data.firstName}
                    onChange={handleOnChange}
                    className="w-full p-2 text-sm border border-gray-300 rounded-md placeholder:text-xs placeholder:font-light placeholder:text-gray-500"
                  />
                </div>

                <div className="flex-1">
                  <span className="mb-1 text-sm">Apellido</span>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Ingresa tu apellido"
                    value={data.lastName}
                    onChange={handleOnChange}
                    className="w-full p-2 text-sm border border-gray-300 rounded-md placeholder:text-xs placeholder:font-light placeholder:text-gray-500"
                  />
                </div>
              </div>

              <div>
                <span className="mb-1 text-sm">Email</span>
                <input
                  type="email"
                  name="email"
                  placeholder="Ingresa tu email"
                  value={data.email}
                  onChange={handleOnChange}
                  className="w-full p-2 text-sm border border-gray-300 rounded-md placeholder:text-xs placeholder:font-light placeholder:text-gray-500"
                />
              </div>

              <div>
                <span className="mb-1 text-sm">Contraseña</span>
                <input
                  type="password"
                  name="password"
                  placeholder="Ingresa tu contraseña"
                  value={data.password}
                  onChange={handleOnChange}
                  className="w-full p-2 text-sm border border-gray-300 rounded-md placeholder:text-xs placeholder:font-light placeholder:text-gray-500"
                />
              </div>

              <div>
                <span className="mb-1 text-sm">Confirmar contraseña</span>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Ingresa tu contraseña de nuevo"
                  value={data.confirmPassword}
                  onChange={handleOnChange}
                  className="w-full p-2 text-sm border border-gray-300 rounded-md placeholder:text-xs placeholder:font-light placeholder:text-gray-500"
                />
              </div>

              <div className="flex items-center py-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    className="mr-2"
                    checked={data.agreeToTerms}
                    onChange={handleOnChange}
                  />
                  <label htmlFor="agreeToTerms" className="text-sm cursor-pointer">
                    Acepto los términos y condiciones
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#ffcc00] text-[#333] p-2 border border-transparent rounded-xl text-lg font-semibold rounded-lg mb-4 hover:bg-yellow-500 hover:text-black hover:border-gray-300 transition-all duration-200 shadow-inset-custom"
              >
                Crear cuenta
              </button>

              <button
                className="w-full border border-gray-300 text-[#333] text-lg font-semibold p-2 rounded-lg mb-4 hover:bg-black hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-inset-custom"
              >
                <img src={iconGoogle} alt="Google" className="w-6 h-6 inline mr-2" />
                Regístrate usando Google
              </button>

              <div className="text-center text-gray-400">
                ¿Ya tienes una cuenta? 
                <span className="font-bold text-black ml-2 hover:underline">
                  <Link to="/login">Inicia sesión</Link>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;




