// src/components/TaskInput.jsx
import { useState } from "react";

export default function TaskInput({ onAdd }) {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (!text.trim()) return alert("Please enter a task!");
    onAdd(text.trim());
    setText("");
  };

  return (
    <div className="task-input">
      <input
        type="text"
        placeholder="Enter a new task..."
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={handleAdd}>Add Task</button>
    </div>
  );
}