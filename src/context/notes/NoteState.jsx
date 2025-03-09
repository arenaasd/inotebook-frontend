import React, { useState } from "react";
import NoteContext from "./NoteContext";

const initialNotes = [];

export const NoteState = ({ children }) => {
  const [notes, setNotes] = useState(initialNotes);

  // Fetch all notes from the API
  const getNotes = async () => {
    const response = await fetch(`http://localhost:3000/api/notes/getnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  // Add a new note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`http://localhost:3000/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });

    const note = await response.json();
    setNotes([...notes, note]);
  };

  // Delete a note
  const DeleteNote = async (id) => {
    const response = await fetch(`http://localhost:3000/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();
    setNotes(notes.filter((note) => note._id !== id));
  };

  // Edit a note
  const EditNote = async (id, title, description, tag) => {
    const response = await fetch(`http://localhost:3000/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });

    if (response.ok) {
      const updatedNote = await response.json();
      setNotes(notes.map((note) => (note._id === id ? updatedNote : note)));
    } else {
      console.error('Failed to update note');
    }
  };

  return (
    <NoteContext.Provider value={{ notes, setNotes, EditNote, DeleteNote, addNote, getNotes }}>
      {children}
    </NoteContext.Provider>
  );
};

export default NoteState;