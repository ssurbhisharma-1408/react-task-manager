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
      <h2>{TITLES[status]} <span className="count">{tasks.length}</span></h2>
      {tasks.length === 0
        ? <p className="empty">No tasks here</p>
        : tasks.map(task => (
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
Commit: