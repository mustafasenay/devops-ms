import { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import type { Task } from './types/task';
import './App.css';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 📌 READ - Backend'den task'leri getir
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/tasks`);
      const result = await response.json();

      if (result.success) {
        setTasks(result.data);
      } else {
        setError('Taskler yüklenirken hata oluştu');
      }
    } catch (err) {
      setError('Sunucuya bağlanılamıyor');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // 📌 CREATE - Backend'e yeni task ekle
  const addTask = async (title: string, description: string) => {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, completed: false }),
      });

      const result = await response.json();

      if (result.success) {
        setTasks([...tasks, result.data]);
      } else {
        setError('Task eklenirken hata oluştu');
      }
    } catch (err) {
      setError('Task eklenemedi');
      console.error('Add error:', err);
    }
  };

  // 📌 UPDATE - Backend'de task güncelle
  const toggleComplete = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !task.completed }),
      });

      const result = await response.json();

      if (result.success) {
        setTasks(tasks.map(t =>
          t.id === id ? { ...t, completed: !t.completed } : t
        ));
      } else {
        setError('Task güncellenirken hata oluştu');
      }
    } catch (err) {
      setError('Task güncellenemedi');
      console.error('Update error:', err);
    }
  };

  // 📌 DELETE - Backend'den task sil
  const deleteTask = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        setTasks(tasks.filter(task => task.id !== id));
      } else {
        setError('Task silinirken hata oluştu');
      }
    } catch (err) {
      setError('Task silinemedi');
      console.error('Delete error:', err);
    }
  };

  if (loading) {
    return (
      <div className="app">
        <h1>✅ Minimal Task Manager</h1>
        <div className="loading">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="app">
      <h1>✅ Minimal Task Manager</h1>
      {error && <div className="error">{error}</div>}
      <TaskForm onAddTask={addTask} />
      <TaskList
        tasks={tasks}
        onToggle={toggleComplete}
        onDelete={deleteTask}
      />
      <div className="info">
        <p>🔗 Backend bağlantısı aktif: {API_URL}</p>
        <p>✅ Tüm CRUD işlemleri backend ile çalışıyor!</p>
      </div>
    </div>
  );
}

export default App;
