import React, { useState } from 'react';

const AddTask = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleAddTask = () => {
    // Lógica para agregar la tarea
    console.log('Task added:', { taskTitle, taskDescription, startDate, dueDate });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-poppins">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">Add New Task</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700">Task Title</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md bg-gray-200 text-gray-700"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-700">Task Description</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md bg-gray-200 text-gray-700"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-700">Start Date</label>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded-md bg-gray-200 text-gray-700"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-700">Due Date</label>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded-md bg-gray-200 text-gray-700"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition text-sm"
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default AddTask;
