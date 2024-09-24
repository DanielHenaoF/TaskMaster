import React, { useState } from 'react';
import { FaUserAlt, FaThLarge, FaCog, FaBell } from 'react-icons/fa';
import Home from '../components/Home';
import Profile from './Profile';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@material-tailwind/react';

const TaskManagementPage = () => {
  const [activeComponent, setActiveComponent] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    navigate('/');
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'home':
        return <Home searchTerm={searchTerm} />;
      case 'profile':
        return <Profile />;
      default:
        return <Home />;
    }
  };

  const userEmail = localStorage.getItem('email') || 'User';
  const tokenExists = Boolean(localStorage.getItem('token'));

  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-indigo-100 to-indigo-100 md:flex-row">
      <aside className="bg-indigo-700 text-white flex flex-col items-center p-4 w-20 shadow-md md:w-20 md:flex-none hidden md:flex">
        <nav className="space-y-4">
          <Tooltip content="" placement="right">
            <button
              onClick={() => setActiveComponent('home')}
              className={`p-3 rounded-full transition-colors duration-200 hover:bg-indigo-500 ${activeComponent === 'home' ? 'bg-indigo-500' : ''
                }`}
            >
              <FaThLarge size={20} />
            </button>
          </Tooltip>
          <Tooltip content="" placement="right">
            <button
              onClick={() => setActiveComponent('profile')}
              className={`p-3 rounded-full transition-colors duration-200 hover:bg-indigo-500 ${activeComponent === 'profile' ? 'bg-indigo-500' : ''
                }`}
            >
              <FaUserAlt size={20} />
            </button>
          </Tooltip>
        </nav>
        <div className="mt-auto">
          {tokenExists ? (
            <button
              className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors duration-200"
              onClick={handleLogout}
            >
              <span>Cerrar</span>
            </button>
          ) : (
            <button
              className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition-colors duration-200"
              onClick={() => navigate('/')}
            >
              <span>Login</span>
            </button>
          )}
        </div>
      </aside>

      <main className="flex-1 lg:p-8 overflow-y-auto bg-gray-100">
        {/* Header with Navigation */}
        <div className="flex justify-between items-center mb-3 border-2 border-indigo-800 p-4 rounded-md">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              className="w-1/4 p-2 rounded-lg shadow-md border border-gray-300 focus:outline-none focus:ring focus:border-indigo-300"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaCog className="text-gray-600 cursor-pointer" />
            <FaBell className="text-gray-600 cursor-pointer" />
          </div>
          <nav className="flex items-center space-x-4 md:hidden">
            <Tooltip content="Tablero" placement="bottom">
              <button
                onClick={() => setActiveComponent('home')}
                className={`text-gray-800 ${activeComponent === 'home' ? 'font-semibold' : ''}`}
              >
                <FaThLarge size={20} />
              </button>
            </Tooltip>
            <Tooltip content="Perfil" placement="bottom">
              <button
                onClick={() => setActiveComponent('profile')}
                className={`text-gray-800 ${activeComponent === 'profile' ? 'font-semibold' : ''}`}
              >
                <FaUserAlt size={20} />
              </button>
            </Tooltip>
            {tokenExists && (
              <button
                className="bg-red-500 text-white px-4 py-1 rounded-lg"
                onClick={handleLogout}
              >
                Cerrar
              </button>
            )}
          </nav>
          <nav className="hidden md:flex space-x-4">
            <button
              onClick={() => setActiveComponent('home')}
              className={`text-gray-800 ${activeComponent === 'home' ? 'font-semibold' : ''}`}
            >
              Tus Trabajos
            </button>
            {/* <button
              onClick={() => setActiveComponent('profile')}
              className={`text-gray-800 ${activeComponent === 'profile' ? 'font-semibold' : ''}`}
            >
              Proyectos
            </button> */}
            {/* <button className="bg-blue-500 text-white px-4 py-1 rounded-lg">
              Enviar Comentarios
            </button> */}
          </nav>
        </div>

        <div className="bg-gray-100 mt-6 p-8">
          {renderComponent()}
        </div>
      </main>
    </div>
  );
};

export default TaskManagementPage;
