import React, { useState, useEffect } from 'react';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [filter, setFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Normal',
    status: 'Pendiente',
    category: '',
  });

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token not found. Please log in again.');

      const response = await fetch('https://maestrodetareas.onrender.com', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error fetching tasks.');
      }

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async () => {
    if (newTask.title.trim()) {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token not found. Please log in again.');

        const response = await fetch('https://maestrodetareas.onrender.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newTask),
          credentials: 'include',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error creating task.');
        }

        fetchTasks();
        resetForm();
        setShowForm(false);
      } catch (error) {
        console.error('Error creating task:', error);
      }
    }
  };

  const handleEditTask = async () => {
    if (editTask && newTask.title.trim()) {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token not found. Please log in again.');

        const response = await fetch(`https://maestrodetareas.onrender.com${editTask.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newTask),
          credentials: 'include',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error updating task.');
        }

        fetchTasks();
        resetForm();
        setShowForm(false);
      } catch (error) {
        console.error('Error updating task:', error);
      }
    }
  };

  const handleUpdateStatus = async (taskId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token not found. Please log in again.');

      const response = await fetch(`https://maestrodetareas.onrender.com${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error updating task status.');
      }

      fetchTasks();
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token not found. Please log in again.');

      const response = await fetch(`https://maestrodetareas.onrender.com${taskId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error deleting task.');
      }

      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === '') return true;
    return task.status === filter;
  }).filter((task) => {
    if (searchTerm === '') return true;
    return (
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const resetForm = () => {
    setNewTask({
      title: '',
      description: '',
      dueDate: '',
      priority: 'Normal',
      status: 'Pendiente',
      category: '',
    });
    setEditTask(null);
  };

  const priorityClasses = {
    Low: 'border-yellow-400',
    Normal: 'border-green-400',
    High: 'border-red-400',
    'Very High': 'border-purple-400',
  };

  return (
    <div className="p-6 min-h-screen font-sans text-gray-900 relative rounded-lg">
      {/* Header and Navigation */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-black">Aquí están tus tareas</h1>
        <nav className="flex items-center mt-4 md:mt-0 space-x-4">
          <input
            type="text"
            placeholder="Buscar tareas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded-lg text-sm focus:outline-none"
          />
        </nav>
      </div>

      {/* Filter Buttons */}
      <div className="mb-4 flex justify-center flex-wrap space-x-2">
        {['All', 'Pendiente', 'En Progreso', 'Completada'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status === 'All' ? '' : status)}
            className={`px-3 py-2 border text-gray-800 rounded-lg text-sm font-semibold ${filter === status ? 'bg-indigo-600 text-white' : ''
              }`}
          >
            {status === 'All' ? 'Todas las Tareas' : status}
          </button>
        ))}
      </div>

      <div className={`flex justify-center flex-wrap gap-4 overflow-x-auto ${showForm ? 'opacity-20' : 'opacity-100'} transition-opacity duration-300`}>
        {['Low', 'Normal', 'High', 'Very High'].map((priority) => (
          <div key={priority} className="bg-indigo-600 p-4 min-w-[23%] max-w-[350px] h-full overflow-y-auto flex-shrink-0 rounded-xl">
            <h2 className={`text-xl font-light mb-3 text-white capitalize border-b-2 pb-2 ${priorityClasses[priority]}`}>{`Prioridad ${priority}`}</h2>
            <div className="space-y-4">
              {filteredTasks
                .filter((task) => task.priority === priority)
                .map((task) => (
                  <div key={task.id} className={`p-2 rounded-lg shadow-sm flex flex-col space-y-2 border-l-4 border-opacity-50 ${priorityClasses[task.priority]} bg-white`}>
                    <div className="flex flex-col">
                      <h3 className="text-lg font-medium text-gray-800">{task.title}</h3>
                      <p className="text-sm text-gray-600">{task.description}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-600">{task.dueDate}</span>
                      <div className="space-x-2">
                        <button
                          onClick={() => {
                            setEditTask(task);
                            setNewTask({
                              title: task.title,
                              description: task.description,
                              dueDate: task.dueDate,
                              priority: task.priority,
                              status: task.status,
                              category: task.category,
                            });
                            setShowForm(true);
                          }}
                          className="text-sm text-blue-500"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="text-sm text-red-500"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                    <div className="mt-2">
                      <select
                        value={task.status}
                        onChange={(e) => handleUpdateStatus(task.id, e.target.value)}
                        className="text-xs rounded-lg p-1 border border-gray-300 focus:outline-none"
                      >
                        {['Pendiente', 'En Progreso', 'Completada'].map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              {filteredTasks.filter((task) => task.priority === priority).length === 0 && (
                <p className="text-gray-500 text-center">No hay tareas</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Task Button */}
      <button
        onClick={() => {
          setShowForm(true);
          resetForm();
        }}
        className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-lg"
      >
        Agregar Tarea
      </button>

      {/* Add/Edit Task Form */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4">{editTask ? 'Editar Tarea' : 'Agregar Tarea'}</h2>
            <input
              type="text"
              placeholder="Título"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="w-full p-2 border rounded-lg mb-4"
            />
            <textarea
              placeholder="Descripción"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="w-full p-2 border rounded-lg mb-4"
              rows="4"
            />
            <input
              type="date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              className="w-full p-2 border rounded-lg mb-4"
            />
            <label className="block text-sm font-medium text-gray-700 mb-1">Selecciona la prioridad:</label>
            <p className="text-xs text-gray-600 mb-2">Elige una prioridad para la tarea.</p>
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              className="w-full p-2 border rounded-lg mb-4"
            >
              <option value="Low">Baja</option>
              <option value="Normal">Normal</option>
              <option value="High">Alta</option>
              <option value="Very High">Muy Alta</option>
            </select>
            <div className="flex justify-between">
              <button
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
                className="text-gray-500"
              >
                Cancelar
              </button>
              <button
                onClick={editTask ? handleEditTask : handleCreateTask}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                {editTask ? 'Guardar Cambios' : 'Agregar Tarea'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
