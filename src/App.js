import React, { useState, useEffect } from 'react';
import './App.css';
import NewNoteField from "./NewNoteField";
import Note from "./Note";

const NotesHeader = ({ onRefresh }) => (
  <div className="NotesHeader">
    Notes
    <button onClick={e => onRefresh()}>Refresh</button>
  </div>
);

const loadNotes = (callback) => {
  console.log('loading')
  fetch("http://localhost:7777/notes")
    .then(r => r.json())
    .then(json => {
      const obj = {};
      json.forEach(note => obj[note.id] = note.content);
      callback(obj);
    })
    .catch(err => callback({ 1: "Failed to load notes \\_(ツ)_/" }));
};
const postNote = (id, text, updatedNotesCallback) => {
  fetch("http://localhost:7777/notes", {
    method: "POST",
    body: JSON.stringify({ id: id, content: text }),
    headers: new Headers({ "Content-Type": "application/json" })
  }).then(() => loadNotes(updatedNotesCallback));
};
const deleteNote = (id) => {
  fetch("http://localhost:7777/notes/" + id, { method: "DELETE" });
};

export default function App() {
  const [notesList, setNotesList] = useState({});
  const onDelete = id => {
    setNotesList(prev => { const next = { ...prev }; delete next[id]; return next; })
    deleteNote(id);
  };
  const onPost = text => {
    const newNoteId = Object.keys(notesList).length + 1;
    postNote(newNoteId, text, setNotesList)
  };

  useEffect(() => {
    loadNotes(setNotesList);
  }, []);

  return (
    <div className="App">
      <NotesHeader onRefresh={() => loadNotes(setNotesList)} />
      {Object.keys(notesList).map(id =>
        <Note key={id} onDelete={() => onDelete(id)}>{notesList[id]}</Note>
      )}
      <NewNoteField onPost={onPost} />
    </div>
  );
};
