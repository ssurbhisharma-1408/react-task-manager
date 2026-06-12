import TaskCard from "./TaskCard";


const TITLES = {
todo: "To Do",
progress: "In Progress",
completed : "Completed",
deleted: "Deleted",
};

export default function TaskColumn({ status, tasks, onUpdateStatus, onDeletePermanently ,onEdit}) {
  return (
    <div className={`column column-${status}`}>
       <div className="column-header">
        <span className="col-title">{TITLES[status]}</span>
        <span className="col-count">{tasks.length}</span>
      </div>
      
      <div className="column-body">
        {tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onUpdateStatus={onUpdateStatus}
              onDeletePermanently={onDeletePermanently}
              onEdit={onEdit}
            />
          ))
        
       }
       </div>
    </div>
  );
}