import React from 'react';
import type { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <div className="task-details">
          <h3 style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            {task.title}
          </h3>
          {task.description && <p>{task.description}</p>}
          <small>
            Oluşturma: {new Date(task.createdAt).toLocaleString('tr-TR')}
          </small>
        </div>
      </div>
      <button onClick={() => onDelete(task.id)} className="delete-btn">
        🗑️ Sil
      </button>
    </div>
  );
};

export default TaskItem;
