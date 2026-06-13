

export default function TaskCard({ task,onDeletePermanently,onEdit }) {

    const handleDragStart = (e) => {
    e.dataTransfer.setData("taskId", task.id);
  };

  return (
    <div className="task-card"
    draggable              
      onDragStart={handleDragStart} >
       <div className="card-top">
        <h4 className="card-title">{task.title}</h4>
        {task.status !== "deleted" && (
          <button className="btn-edit" onClick={() => onEdit(task)} title="Edit">
            Edit
          </button>
        )}
      </div>
      {task.description && (<p className="card-desc">{task.description}</p> )}
      {task.status === "deleted" && (<button className="btn-del" onClick={()=> onDeletePermanently(task.id)}>Remove</button>)}
    </div>
  );
}