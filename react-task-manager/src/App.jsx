// src/App.jsx
import { useState } from "react";
import TaskModal from "./components/TaskModal";
import TaskColumn from "./components/TaskColumn";
import "./App.css";

const COLUMNS = ["todo", "progress", "completed", "deleted"];

export default function App() {
  const [tasks, setTasks] = useState(
    () => JSON.parse(localStorage.getItem("tasks")) || []
  );

  const save = (updated) => {
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  };
   const [showModal, setShowModal] = useState(false);
   const [editingTask, setEditingTask] = useState(null);

    const handleSave = ({ title, description }) => {
    if (editingTask) {
      save(tasks.map(t =>
        t.id === editingTask.id ? { ...t, title, description } : t
      ));
    } else {
      save([...tasks, {
        id: Date.now(),
        title,
        description,
        status: "todo"
      }]);
    }
    setEditingTask(null);
  };

   const openAddModal = () => {
    setEditingTask(null);
    setShowModal(true);
  };
    const openEditModal = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };
  
  

  const deletePermanently = (id) => {
    save(tasks.filter(t => t.id !== id));
  };

  const totalActive = tasks.filter(t => t.status !== "deleted").length;

  const handleDrop = (taskId, newStatus) => {
  save(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
};

  return (
    <div className="app">
        <div className="app-header">
        <div className="header-left">
          <h1>Task Manager</h1>
          <span className="total-badge">{totalActive} Active Tasks</span>
        </div>
        <button className="btn-add-task" onClick={openAddModal}>
          + New Task
        </button>
      </div>
      <div className="board">
        {COLUMNS.map(col => (
          <TaskColumn
            key={col}
            status={col}
            tasks={tasks.filter(t => t.status === col)}
            onDeletePermanently={deletePermanently}
            onEdit={openEditModal}
            onDrop={handleDrop} 
          />
        ))}
      </div>

      {showModal && (
        <TaskModal
          existingTask={editingTask}
          onSave={handleSave}
          onClose={() => { setShowModal(false); setEditingTask(null); }}
        />
      )}
    </div>
  );
}
