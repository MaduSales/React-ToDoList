import React, { useState } from 'react';
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!inputText.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: inputText, completed: false }]);
    setInputText('');
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <div className="container">
      <h1>To Do List</h1>
      <form onSubmit={handleSubmit} className="inputField">
        <input
          type="text"
          placeholder="Add task"
          value={inputText}
          onChange={handleInputChange}
        />
        <button type="submit">+</button>
      </form>
      <div className="toDoList">
        <span>Tasks</span>
        <div className="list-items">
          {tasks.map((task) => (
            <div
              className={`items ${task.completed ? 'isChecked' : ''}`}
              key={task.id}
            >
              <div className="items-text">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                <div>{task.text}</div>
              </div>
              <button
                className="delete-icon"
                onClick={() => handleDelete(task.id)}
              >
                &#x2715;
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
