import React, { useState } from 'react';

interface TaskFormProps {
  onAddTask: (title: string, description: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask(title, description);
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='task-form'>
      <input
        type='text'
        placeholder='Task başlığı *'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder='Açıklama'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={2}
      />
      <button type='submit'>Task Ekle</button>
    </form>
  );
};

export default TaskForm;
