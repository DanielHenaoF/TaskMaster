import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    city: '',
    currentPassword: '', // Campo para la contraseña actual
    newPassword: '' // Campo para la nueva contraseña
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          window.location.href = '/';
          return;
        }

        const response = await fetch('https://taskmaster-cfkw.onrender.com/api/auth/profile', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error fetching user profile.');
        }

        const userData = await response.json();
        setUser(userData);
        setFormData({
          username: userData.username,
          email: userData.email,
          phone: userData.phone,
          city: userData.city,
          currentPassword: '', // Mantener vacío al cargar el perfil
          newPassword: '' // Mantener vacío al cargar el perfil
        });
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData({
      username: user.username,
      email: user.email,
      phone: user.phone,
      city: user.city,
      currentPassword: '', // Restablecer campo de contraseña actual vacío
      newPassword: '' // Restablecer campo de nueva contraseña vacío
    });
    setProfilePhoto(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setProfilePhoto(file);
  };

  const handleSaveChanges = async () => {
    if (!formData.username || !formData.email) {
      setError('El nombre de usuario y el correo electrónico son obligatorios.');
      return;
    }

    if (formData.newPassword && formData.newPassword.length < 6) {
      setError('La nueva contraseña debe tener al menos 6 caracteres.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      console.log('Datos enviados al servidor:', formData); // Verificar los datos antes de enviar
      const response = await fetch('https://taskmaster-cfkw.onrender.com/api/auth/update', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          currentPassword: formData.currentPassword, // Enviar la contraseña actual
          newPassword: formData.newPassword // Enviar la nueva contraseña
        }),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error updating profile.');
      }

      const updatedUser = await response.json();
      setUser(updatedUser.user);
      setIsEditing(false);
      setSuccessMessage('Perfil actualizado exitosamente');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  if (!user) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="profile-container max-w-8xl mx-auto p-8 bg-indigo-600 rounded-lg shadow-lg flex gap-14">
      {/* <div className="profile-photo flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
        <img
          src={user.profilePhoto || '/default-profile.jpg'}
          alt="Profile"
          className="w-40 h-40 rounded-full object-cover mb-4"
        />
        {isEditing && (
          <div className="mt-4">
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="border border-gray-300 p-2 rounded-md"
            />
          </div>
        )}
        <button
          onClick={handleEditClick}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg text-sm font-medium"
        >
          Editar Foto
        </button>
      </div> */}

      <div className="profile-info flex-1 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold mb-6">Perfil de Usuario</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}
        <label className="flex flex-col mb-4">
          Nombre de usuario:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            disabled={!isEditing}
            className="mt-1 p-3 border border-gray-300 rounded-md text-sm"
          />
        </label>
        <label className="flex flex-col mb-4">
          Correo electrónico:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!isEditing}
            className="mt-1 p-3 border border-gray-300 rounded-md text-sm"
          />
        </label>
        <label className="flex flex-col mb-4">
          Teléfono:
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={!isEditing}
            className="mt-1 p-3 border border-gray-300 rounded-md text-sm"
          />
        </label>
        <label className="flex flex-col mb-4">
          Ciudad:
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            disabled={!isEditing}
            className="mt-1 p-3 border border-gray-300 rounded-md text-sm"
          />
        </label>
        {isEditing && (
          <>
            <label className="flex flex-col mb-4">
              Contraseña Actual:
              <div className="relative">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="mt-1 p-3 border border-gray-300 rounded-md text-sm pr-10"
                />
                <button
                  type="button"
                  onClick={toggleCurrentPasswordVisibility}
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </label>
            <label className="flex flex-col mb-4">
              Nueva Contraseña:
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="mt-1 p-3 border border-gray-300 rounded-md text-sm pr-10"
                />
                <button
                  type="button"
                  onClick={toggleNewPasswordVisibility}
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </label>
          </>
        )}
        <div className="button-group flex gap-4 mt-6">
          {isEditing ? (
            <>
              <button
                onClick={handleSaveChanges}
                className="bg-green-500 text-white py-2 px-6 rounded-md text-sm font-medium"
              >
                Guardar Cambios
              </button>
              <button
                onClick={handleCancelEdit}
                className="bg-red-500 text-white py-2 px-6 rounded-md text-sm font-medium"
              >
                Cancelar
              </button>
            </>
          ) : (
            <button
              onClick={handleEditClick}
              className="bg-blue-500 text-white py-2 px-6 rounded-md text-sm font-medium"
            >
              Editar Perfil
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
