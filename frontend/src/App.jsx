import { useState } from "react";

function NoteItem({ note, onDelete }) {
  return (
    <div>
      <p>{note}</p>
      <button onClick={onDelete}>Löschen</button>
    </div>
  );
}

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  const handleInputChange = (event) => {
    setNewNote(event.target.value);
  };

  const handleAddNote = () => {
    if (newNote.trim() !== "") {
      setNotes([...notes, newNote]);
      setNewNote("");
    }
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  return (
    <div>
      <h1>Mein Mini-Notizblock</h1>
      <input
        type="text"
        placeholder="Neue Notiz hinzufügen"
        value={newNote}
        onChange={handleInputChange}
      />
      <button onClick={handleAddNote}>Hinzufügen</button>

      <h2>Notizen</h2>
      {notes.length === 0 ? (
        <p>Keine Notizen vorhanden.</p>
      ) : (
        <ul>
          {notes.map((note, index) => (
            <li key={index}>
              <NoteItem note={note} onDelete={() => handleDeleteNote(index)} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;