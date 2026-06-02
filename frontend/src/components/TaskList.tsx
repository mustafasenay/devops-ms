import React from 'react';
import type { Task } from '../types/task';
import TaskItem from './TaskItem.tsx';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onDelete }) => {
  if (tasks.length === 0) {
    return (
      <div className='empty-state'>
        <p>Henüz task eklenmedi.</p>
      </div>
    );
  }

  return (
    <div className='task-list'>
      <h2>Tasklar ({tasks.length})</h2>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
