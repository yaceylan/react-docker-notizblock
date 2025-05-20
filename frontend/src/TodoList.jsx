import React, { useState, useEffect } from 'react';

function TodoList() {
  console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);

  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState('');

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const response = await fetch(`/${import.meta.env.VITE_API_URL}/items`);
        if (!response.ok) {
          console.error(`HTTP error! status: ${response.status}`);
          return;
        }
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Fehler beim Laden der Todos:", error);
      }
    };

    loadTodos();
  }, []);

  const addTodo = async () => {
    if (newTodoText.trim()) {
      try {
        const response = await fetch(`/${import.meta.env.VITE_API_URL}/items`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: newTodoText }),
        });
        if (!response.ok) {
          console.error(`HTTP error! status: ${response.status}`);
          return;
        }
        const newTodo = await response.json();
        setTodos([...todos, newTodo]);
        setNewTodoText('');
      } catch (error) {
        console.error("Fehler beim Hinzufügen des Todos:", error);
      }
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`/${import.meta.env.VITE_API_URL}/items/${id}`, {
        method: 'DELETE',
      });
      if (response.status === 204) {
        setTodos(todos.filter(todo => todo.id !== id));
      } else {
        console.error(`Fehler beim Löschen des Todos, Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Fehler beim Löschen des Todos:", error);
    }
  };

  return (
    <div>
      <h1>Todo Liste</h1>
      <input
        type="text"
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
      />
      <button onClick={addTodo}>Hinzufügen</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text} <button onClick={() => deleteTodo(todo.id)}>Löschen</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
