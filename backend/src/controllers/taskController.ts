import { Request, Response } from 'express';
import { Task, CreateTaskDTO, UpdateTaskDTO } from '../types/task';

// Geçici in-memory storage (ileride database'e geçecek)
let tasks: Task[] = [];
let currentId = 1;

export const getAllTasks = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: tasks,
    count: tasks.length
  });
};

export const getTaskById = (req: Request, res: Response) => {
  const { id } = req.params;
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({
      success: false,
      error: 'Task not found'
    });
  }

  res.status(200).json({
    success: true,
    data: task
  });
};

export const createTask = (req: Request<{}, {}, CreateTaskDTO>, res: Response) => {
  const { title, description, completed = false } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({
      success: false,
      error: 'Title is required'
    });
  }

  const newTask: Task = {
    id: Date.now().toString(),
    title: title.trim(),
    description: description || '',
    completed,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  tasks.push(newTask);

  res.status(201).json({
    success: true,
    data: newTask,
    message: 'Task created successfully'
  });
};

export const updateTask = (req: Request<{ id: string }, {}, UpdateTaskDTO>, res: Response) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  const taskIndex = tasks.findIndex(t => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Task not found'
    });
  }

  // Update only provided fields
  if (title !== undefined) tasks[taskIndex].title = title.trim();
  if (description !== undefined) tasks[taskIndex].description = description;
  if (completed !== undefined) tasks[taskIndex].completed = completed;
  tasks[taskIndex].updatedAt = new Date();

  res.status(200).json({
    success: true,
    data: tasks[taskIndex],
    message: 'Task updated successfully'
  });
};

export const deleteTask = (req: Request, res: Response) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(t => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Task not found'
    });
  }

  tasks.splice(taskIndex, 1);

  res.status(200).json({
    success: true,
    message: 'Task deleted successfully'
  });
};

export const deleteAllTasks = (req: Request, res: Response) => {
  tasks = [];
  res.status(200).json({
    success: true,
    message: 'All tasks deleted successfully'
  });
};
