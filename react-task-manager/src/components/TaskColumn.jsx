import TaskCard from "./TaskCard";


const TITLES = {
todo: "To Do",
progress: "In Progress",
completed : "Completed",
deleted: "Deleted",
};




export default function TaskColumn({ status, tasks, onDeletePermanently ,onEdit,onDrop }) {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const taskId = Number(e.dataTransfer.getData("taskId"));
    onDrop(taskId, status);
  };


  return (
    <div className={`column column-${status}`}
     onDragOver={handleDragOver}
      onDrop={handleDrop}>
       <div className="column-header">
        <span className="col-title">{TITLES[status]}</span>
        <span className="col-count">{tasks.length}</span>
      </div>
      
      <div className="column-body">
        {tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onDeletePermanently={onDeletePermanently}
              onEdit={onEdit}
            />
          ))
        
       }
       </div>
    </div>
  );
}