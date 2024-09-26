import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [showResetForm, setShowResetForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoggingIn(true);

    try {
      const response = await fetch('https://taskmaster-cfkw.onrender.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || 'Login fallo, porfavor chequea tu email o password'
        );
      }

      const data = await response.json();
      console.log('Login successful:', data);

      localStorage.setItem('token', data.token);
      localStorage.setItem('email', email);

      setShowWelcome(true);
      setTimeout(() => {
        setShowWelcome(false);
        navigate('/home');
      }, 3000);
    } catch (err) {
      setError(err.message);
      setIsLoggingIn(false);
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await fetch('https://taskmaster-cfkw.onrender.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: resetEmail }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'error al enviar mensaje para resetear password');
      }

      setResetEmail('');
      setShowResetForm(false);
      setSuccessMessage('Solicitud exitosa, revise su correo.');
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Círculo grande */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-indigo-600 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
      {/* Círculos pequeños */}
      <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-indigo-500 rounded-full"></div>
      <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-indigo-500 rounded-full"></div>
      <div className="absolute top-2/3 left-1/4 w-8 h-8 bg-indigo-500 rounded-full"></div>

      <div className="max-w-md w-full space-y-8 z-10">
        <div>
          <h1 className="mt-6 text-center text-4xl font-extrabold text-gray-900">Taskmaster</h1>
        </div>

        {showWelcome && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50">
            <div className="bg-indigo-600 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-white">¡Bienvenido a Taskmaster!</h2>
            </div>
          </div>
        )}

        {successMessage && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold text-blue-600">{successMessage}</h2>
            </div>
          </div>
        )}

        {showResetForm ? (
          <form
            onSubmit={(e) => { e.preventDefault(); handleResetPassword(); }}
            className="mt-8 space-y-6"
          >
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Recuperar Contraseña</h2>
              {error && <p className="text-red-500">{error}</p>}
              <div className="mt-2">
                <label htmlFor="resetEmail" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                <input
                  type="email"
                  id="resetEmail"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Introduce tu correo"
                />
              </div>
              <div className="mt-6 flex justify-between">
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none"
                >
                  Enviar enlace de recuperación
                </button>
                <button
                  type="button"
                  onClick={() => setShowResetForm(false)}
                  className="text-indigo-600 hover:underline"
                >
                  Volver a iniciar sesión
                </button>
              </div>
            </div>
          </form>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
          >
            <div>
              {error && <p className="text-red-500">{error}</p>}
              <div className="mt-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Introduce tu correo"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Introduce tu contraseña"
                />
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className={`w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isLoggingIn ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                  {isLoggingIn ? 'Iniciando sesión...' : 'Iniciar sesión'}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowResetForm(true)}
                className="text-indigo-600 hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </button>
              <Link to="/register" className="text-indigo-600 hover:underline">
                Crear una cuenta
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
