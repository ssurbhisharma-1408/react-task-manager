import TaskCard from "./TaskCard";


const TITLES = {
todo: "To Do",
progress: "In Progress",
completed : "Completed",
deleted: "Deleted",
};

export default function TaskColumn({ status, tasks, onUpdateStatus, onDeletePermanently }) {
  return (
    <div className={`column column-${status}`}>
      <h2>{TITLES[status]}</h2>
      
        {tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onUpdateStatus={onUpdateStatus}
              onDeletePermanently={onDeletePermanently}
            />
          ))
        
       }
    </div>
  );
}