// src/App.jsx
import { useState } from "react";
import TaskInput from "./components/TaskInput";
import TaskColumn from "./components/TaskColumn";
import "./App.css";

const COLUMNS = ["todo", "progress", "completed", "deleted"];

export default function App() {
  const [tasks, setTasks] = useState(
    () => JSON.parse(localStorage.getItem("tasks")) || []
  );

  // Jab bhi tasks update ho, localStorage bhi update ho
  const save = (updated) => {
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  };

  const addTask = (text) => {
    save([...tasks, { id: Date.now(), text, status: "todo" }]);
  };

  const updateStatus = (id, status) => {
    save(tasks.map(t => t.id === id ? { ...t, status } : t));
  };

  const deletePermanently = (id) => {
    save(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="app">
      <h1>Task Manager</h1>
      <TaskInput onAdd={addTask} />
      <div className="board">
        {COLUMNS.map(col => (
          <TaskColumn
            key={col}
            status={col}
            tasks={tasks.filter(t => t.status === col)}
            onUpdateStatus={updateStatus}
            onDeletePermanently={deletePermanently}
          />
        ))}
      </div>
    </div>
  );
}
