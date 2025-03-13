const express = require('express');
const router = express.Router();

// Mock data for tasks
let tasks = [
  {
    id: 1,
    text: 'Complete project documentation',
    completed: false,
    dueDate: '2025-03-20'
  },
  {
    id: 2,
    text: 'Fix navigation bug',
    completed: true,
    dueDate: null
  },
  {
    id: 3,
    text: 'Implement new feature',
    completed: false,
    dueDate: '2025-03-15'
  },
  {
    id: 4,
    text: 'Code review',
    completed: false,
    dueDate: '2025-03-18'
  }
];

// GET all tasks
router.get('/tasks', (req, res) => {
  res.json(tasks);
});

// GET a specific task by ID
router.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(task => task.id === taskId);
  
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  
  res.json(task);
});

// POST a new task
router.post('/tasks', (req, res) => {
  const { text, dueDate } = req.body;
  
  if (!text || text.trim() === '') {
    return res.status(400).json({ message: 'Task text is required' });
  }
  
  const newTask = {
    id: tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1,
    text,
    completed: false,
    dueDate: dueDate || null
  };
  
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT (update) a task
router.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  
  const { text, completed, dueDate } = req.body;
  
  tasks[taskIndex] = {
    ...tasks[taskIndex],
    text: text !== undefined ? text : tasks[taskIndex].text,
    completed: completed !== undefined ? completed : tasks[taskIndex].completed,
    dueDate: dueDate !== undefined ? dueDate : tasks[taskIndex].dueDate
  };
  
  res.json(tasks[taskIndex]);
});

// DELETE a task
router.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  
  const deletedTask = tasks[taskIndex];
  tasks = tasks.filter(task => task.id !== taskId);
  
  res.json(deletedTask);
});

module.exports = router;