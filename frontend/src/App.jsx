import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Mein Mini-Notizblock mit Backend-Sync</h1>
      </header>
      <main className="App-main">
        <TodoList />
      </main>
    </div>
  );
}

export default App;