// src/App.jsx
import { useState,useEffect } from "react";
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
   const [count,setCounter] = useState(0);
   const [searchInput,setSearchInput]=useState("");
   const [searchQuery,setSearchQuery] = useState("");

    const increment =()=>{
      setCounter(prev => prev+2);
      setTimeout(()=>{
         setCounter(prev=> prev+2);
      },3000)
    }
     useEffect (()=>{
      const timer = setTimeout(()=>{
        setSearchQuery(searchInput);
      },2000);

      return ()=>clearTimeout(timer);
      
     },[searchInput]);


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

          <div className="search-wrapper">
            <input type="text" 
            className="search-input"
            value={searchInput}
            placeholder="Search by title or description"
            onChange={e=>setSearchInput(e.target.value)}/>
            {searchInput && (
            <button className="search-clear" onClick={() => { setSearchInput(""); setSearchQuery(""); }}>
              X
            </button>
          )}
          {searchQuery.trim() && (
  <div className="search-dropdown">
    {(() => {
      const results = tasks.filter(t => {
        const keyword = searchQuery.toLowerCase();
        return (
          (t.title).toLowerCase().includes(keyword) ||
          (t.description).toLowerCase().includes(keyword)
        );
      });

      return results.length === 0 ? (
        <p className="search-empty">No tasks found for "{searchQuery}"</p>
      ) : (
        results.map(t => (
          <div key={t.id} className="search-result-item">
            <div className="search-result-top">
              <span>{t.title}</span>
              <span>
                {t.status}
              </span>
            </div>
            {t.description && (
              <p>{t.description}</p>
            )}
          </div>
        ))
      );
    })()}
  </div>
)}
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
            tasks={tasks.filter(t=>t.status===col)}
            onDeletePermanently={deletePermanently}
            onEdit={openEditModal}
            onDrop={handleDrop} 
          />
        ))}
      </div>
    
          <div className = "counter-btns">
          <button className="counter-btn" onClick={increment}> Counter {count}</button>
          <button className= "counter-btn" onClick={()=>setCounter(0)}> Reset</button>
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
