const express = require("express");
const cors = require("cors"); 
const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); 
app.use(express.json());

let todos = [];
let nextId = 1;

app.get("/api/todos", (req, res) => {
  res.json(todos);
});

app.get("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).send("Todo not found");
  }
});

app.post("/api/todos", (req, res) => {
  const { text } = req.body;
  if (text) {
    const newTodo = { id: nextId++, text };
    todos.push(newTodo);
    res.status(201).json(newTodo);
  } else {
    res.status(400).send("Text is required");
  }
});

app.delete("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = todos.length;
  todos = todos.filter(t => t.id !== id);
  if (todos.length < initialLength) {
    res.status(204).send();
  } else {
    res.status(404).send("Todo not found");
  }
});

app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});