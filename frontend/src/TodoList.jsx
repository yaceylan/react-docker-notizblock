import React, { useState, useEffect } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState('');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/items`)
      .then(response => response.json())
      .then(data => setTodos(data));
  }, []);

  const handleAddTodo = () => {
    if (newTodoText.trim()) {
      fetch(`${import.meta.env.VITE_API_URL}/api/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newTodoText }),
      })
        .then(response => response.json())
        .then(data => {
          setTodos([...todos, data]);
          setNewTodoText(''); // Eingabefeld leeren
        });
    }
  };

  const handleDeleteTodo = (idToDelete) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/items/${idToDelete}`, {
      method: 'DELETE',
    })
      .then(() => setTodos(todos.filter(todo => todo.id !== idToDelete)));
  };

  return (
    <div>
      <h1>Meine Todos</h1>
      <div>
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Neues Todo hinzufügen"
        />
        <button onClick={handleAddTodo}>Hinzufügen</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => handleDeleteTodo(todo.id)}>Löschen</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;