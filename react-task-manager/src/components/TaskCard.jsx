
const STATUS_BUTTONS = {
  todo:      [{ label: "Start",    clss: "start",    next: "progress"  },
              { label: " Delete",   clss: "delete",   next: "deleted"   }],
  progress:  [{ label: " Complete", clss: "complete", next: "completed" },
              { label: " Delete",   clss: "delete",   next: "deleted"   }],
  completed: [{ label: " Delete",   clss: "delete",   next: "deleted"   }],
  deleted:   [{ label: " Restore",  clss: "restore",  next: "todo"      },
              { label: " Delete Forever", clss: "perm-delete", next: null }],
};

export default function TaskCard({ task, onUpdateStatus, onDeletePermanently }) {
  const buttons = STATUS_BUTTONS[task.status];

  return (
    <div className="task-card">
      <p>{task.text}</p>
      <div className="btn-group">
        {buttons.map(btn => (
          <button
            key={btn.label}
            className={btn.clss}
            onClick={() =>
              btn.next
                ? onUpdateStatus(task.id, btn.next)
                : onDeletePermanently(task.id)
            }
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}