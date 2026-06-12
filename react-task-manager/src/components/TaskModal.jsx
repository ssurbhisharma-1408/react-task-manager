import { useEffect, useState } from "react";

export default function TaskModal({onSave,onClose,existingTask}) {
    const [title,setTitle]= useState("");
    const[description,setDescription]=useState("");

    useEffect(()=>{
            if (existingTask){
                setTitle(existingTask.title || "");
                setDescription(existingTask.description || "")
            }
    },[existingTask]);

    const handleSave= ()=>{
        if(!title.trim()) return alert("Title required!");
        onSave({title: title.trim(),description: description.trim()});
        onClose();
    };

    return ( 
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-box" onClick={e=>e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{existingTask? "Edit Task" : "New Task"}</h2>
                    <button className="modal-close" onClick={onClose}>X</button>                   
                </div>
                <div className="modal-body">
                    <label>Task Title</label>
                    <input 
                    type="text"
                    placeholder="enter your task"
                    value={title}
                    onChange={e=>setTitle(e.target.value)}
                     />
                     <label>Description</label>
                     <textarea 
                     placeholder="Add more details"
                     value={description}
                     onChange={e=>setDescription(e.target.value)}
                     rows={4}
                     />
                     <div className="modal-footer">
                        <button className="btn-cancel" onClick={onClose}>Cancel</button>
                        <button className="btn-save" onClick={handleSave}>
                            {existingTask? "Save Changes": "Add task"}
                        </button>
                     </div>

                </div>
            </div>
        </div>
     );
}

