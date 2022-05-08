import React, { useEffect } from 'react';
import './App.css';
import NewNoteField from "./NewNoteField";
import Note from "./Note";
import useCrud from "./useCrud";

const NotesHeader = ({ onRefresh }) => (
  <div className="NotesHeader">
    Notes
    <button onClick={e => onRefresh()}>Refresh</button>
  </div>
);

export default function App() {
  const [notes, error, isLoading, { create, readAll, del }] = useCrud("http://localhost:7777/notes");

  useEffect(() => {
    const fn = isLoading ? "add" : "remove";
    document.body.classList[fn]("app-indicate-loading");
  }, [isLoading]);

  useEffect(() => { if (error) alert("Failed (" + error + ")") }, [error]);

  return (
    <div className="App">
      <NotesHeader onRefresh={readAll} />
      {notes && notes.map(n =>
        <Note key={n.id} onDelete={() => del(n.id)}>{n.content}</Note>
      )}
      <NewNoteField onPost={create} />
    </div>
  );
};
