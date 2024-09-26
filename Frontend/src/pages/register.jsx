import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem('registerEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      localStorage.removeItem('registerEmail');
    }
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://taskmaster-cfkw.onrender.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, phone, city }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed.');
      }
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Cuadrado grande */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-indigo-600 rounded-lg transform translate-x-1/2 -translate-y-1/2"></div>
      {/* Cuadrados pequeños */}
      <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-indigo-500"></div>
      <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-indigo-500"></div>
      <div className="absolute top-2/3 right-1/4 w-8 h-8 bg-indigo-500"></div>

      <div className="max-w-md w-full space-y-8 z-10">
        <h1 className="text-4xl font-extrabold text-center text-black">Taskmaster</h1>

        <form onSubmit={handleRegister} className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Crea tu cuenta</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}

          {/* Username Input */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nombre de Usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 shadow-sm border rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Introduce tu nombre de usuario"
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 shadow-sm border rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Introduce tu correo"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 shadow-sm border rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Introduce tu contraseña"
            />
          </div>

          {/* Phone Input */}
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 shadow-sm border rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Introduce tu número de teléfono"
            />
          </div>

          {/* City Input */}
          <div className="mb-6">
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">Ciudad</label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="mt-1 shadow-sm border rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Introduce tu ciudad"
            />
          </div>

          {/* Submit Button */}
          <div className="mb-4">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Registrarse
            </button>
          </div>

          {/* Links to Login and Home */}
          <div className="flex flex-col mt-4 gap-2">
            <Link to="/" className="text-indigo-600 hover:underline text-center">¿Ya tienes una cuenta? Iniciar sesión</Link>
            <Link to="/home" className="text-indigo-600 hover:underline text-center">Página Principal</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
