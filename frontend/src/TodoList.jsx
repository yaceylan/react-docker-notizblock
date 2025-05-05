import React, { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL + "/api/todos";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setTodos(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [API_URL]);

  const handleAddTodo = () => {
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: newTodoText }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(newTodo => {
        setTodos([...todos, newTodo]);
        setNewTodoText("");
      })
      .catch(error => setError(error));
  };

  const handleDeleteTodo = (id) => {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
      .then(response => {
        if (response.status === 204) {
          setTodos(todos.filter(todo => todo.id !== id));
        } else if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      })
      .catch(error => setError(error));
  };

  if (loading) return <p>Loading todos...</p>;
  if (error) return <p>Error fetching todos: {error.message}</p>;

  return (
    <div>
      <h2>Todos vom Backend</h2>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text} <button onClick={() => handleDeleteTodo(todo.id)}>Löschen</button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newTodoText}
          onChange={e => setNewTodoText(e.target.value)}
        />
        <button onClick={handleAddTodo}>Neues Todo hinzufügen</button>
      </div>
    </div>
  );
}

export default TodoList;