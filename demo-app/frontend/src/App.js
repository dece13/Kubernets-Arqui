import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || '/api';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [health, setHealth] = useState(null);

  // Fetch todos from backend
  useEffect(() => {
    fetchTodos();
    checkHealth();
  }, []);

  const checkHealth = async () => {
    try {
      const response = await fetch(`${API_URL}/health`);
      const data = await response.json();
      setHealth(data);
    } catch (err) {
      console.error('Health check cambio v1:', err);
    }
  };

  const fetchTodos = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}/todos`);
      if (!response.ok) throw new Error('Failed to fetch todos');
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTodo }),
      });
      
      if (!response.ok) throw new Error('Failed to create todo');
      
      setNewTodo('');
      await fetchTodos();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete todo');
      
      await fetchTodos();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>📝 TODO App</h1>
          <p className="subtitle">Demo Full-Stack Application</p>
          {health && (
            <div className={`health-status ${health.status}`}>
              🟢 Backend: {health.status} | DB: {health.database}
            </div>
          )}
        </header>

        <form onSubmit={addTodo} className="todo-form">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
            className="todo-input"
            disabled={loading}
          />
          <button type="submit" className="add-button" disabled={loading}>
            {loading ? '...' : 'Add'}
          </button>
        </form>

        {error && <div className="error-message">⚠️ {error}</div>}

        <div className="todo-list">
          {loading && todos.length === 0 ? (
            <div className="loading">Loading...</div>
          ) : todos.length === 0 ? (
            <div className="empty-state">
              <p>No tasks yet! Add one above to get started.</p>
            </div>
          ) : (
            todos.map((todo) => (
              <div key={todo.id} className="todo-item">
                <div className="todo-content">
                  <span className="todo-title">{todo.title}</span>
                  <span className="todo-date">
                    {new Date(todo.created_at).toLocaleDateString()}
                  </span>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="delete-button"
                  disabled={loading}
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        <footer className="footer">
          <p>Total Tasks: {todos.length}</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
