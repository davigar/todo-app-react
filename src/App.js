import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [dueDateValue, setDueDateValue] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
  const [showDueDateInput, setShowDueDateInput] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  // Load todos from localStorage on initial render
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
        dueDate: dueDateValue || null
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
      setDueDateValue('');
      setShowDueDateInput(false);
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const updateDueDate = (id, dueDate) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, dueDate } : todo
      )
    );
    setEditingTodo(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const isOverdue = (todo) => {
    if (!todo.dueDate || todo.completed) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(todo.dueDate);
    return dueDate < today;
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all'
  });

  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="App">
      <div className="todo-app">
        <h1>TODO App</h1>
        
        <div className="add-todo-container">
          <div className="add-todo">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTodo()}
              placeholder="What needs to be done?"
            />
            <button 
              className="date-toggle-btn" 
              onClick={() => setShowDueDateInput(!showDueDateInput)}
              title={showDueDateInput ? "Hide due date" : "Add due date"}
            >
              📅
            </button>
            <button onClick={addTodo}>Add</button>
          </div>
          
          {showDueDateInput && (
            <div className="due-date-input">
              <label>Due date: </label>
              <input
                type="date"
                value={dueDateValue}
                onChange={(e) => setDueDateValue(e.target.value)}
              />
            </div>
          )}
        </div>
        
        {todos.length > 0 && (
          <>
            <ul className="todo-list">
              {filteredTodos.map(todo => (
                <li 
                  key={todo.id} 
                  className={`${todo.completed ? 'completed' : ''} ${isOverdue(todo) ? 'overdue' : ''}`}
                >
                  <div className="todo-item-main">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                    />
                    <span>{todo.text}</span>
                    <button onClick={() => deleteTodo(todo.id)}>×</button>
                  </div>
                  
                  <div className="todo-item-due-date">
                    {editingTodo === todo.id ? (
                      <div className="edit-due-date">
                        <input
                          type="date"
                          value={todo.dueDate || ''}
                          onChange={(e) => updateDueDate(todo.id, e.target.value)}
                          onBlur={() => setEditingTodo(null)}
                        />
                      </div>
                    ) : (
                      todo.dueDate && (
                        <div 
                          className="due-date-display" 
                          onClick={() => setEditingTodo(todo.id)}
                          title="Click to edit due date"
                        >
                          Due: {formatDate(todo.dueDate)}
                        </div>
                      )
                    )}
                    
                    {!todo.dueDate && !editingTodo && (
                      <button 
                        className="add-date-btn" 
                        onClick={() => setEditingTodo(todo.id)}
                        title="Add due date"
                      >
                        Add date
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="todo-footer">
              <span>{activeTodosCount} items left</span>
              
              <div className="filters">
                <button 
                  className={filter === 'all' ? 'active' : ''} 
                  onClick={() => setFilter('all')}
                >
                  All
                </button>
                <button 
                  className={filter === 'active' ? 'active' : ''} 
                  onClick={() => setFilter('active')}
                >
                  Active
                </button>
                <button 
                  className={filter === 'completed' ? 'active' : ''} 
                  onClick={() => setFilter('completed')}
                >
                  Completed
                </button>
              </div>
              
              <button onClick={clearCompleted}>Clear completed</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
