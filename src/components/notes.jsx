import React, { useContext, useEffect, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./Noteitem";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(NoteContext);
  const navigate = useNavigate()
  const { notes, getNotes, EditNote } = context;

  // Fetch notes on component mount
  useEffect(() => {
 // Check what it logs
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getNotes();
    }
  }, []);
  // State for the note being edited in the modal
  const [modalNote, setModalNote] = useState({ id: "", title: "", description: "", tag: "" });

  // Handle input changes in the modal
  const handleChange = (e) => {
    setModalNote({ ...modalNote, [e.target.name]: e.target.value });
  };

  // Open the modal and set the current note for editing
  const updateNote = (currentNote) => {
    setModalNote({ ...currentNote, id: currentNote._id || currentNote.id }); // Ensure id is included
    const modal = new window.bootstrap.Modal(document.getElementById("editModal"));
    modal.show();
    props.showAlert("Note Updated Successfully", "success");
  };

  // Save the edited note
  const handleSave = () => {
    if (!modalNote.id) {
      return;
    }

    EditNote(modalNote.id, modalNote.title, modalNote.description, modalNote.tag);
    document.getElementById("closeModal").click();
   
  };

  return (
    <div className="container-fluid min-vh-100" style={{ backgroundColor: "#0A192F", padding: "20px" }}>
      <h2 className="text-warning text-center mb-4">My Notes</h2>
      <div className="row g-3">
        {notes.length > 0 ? (
          notes.map((note) => (
            <NoteItem showAlert={props.showAlert} key={note._id} updateNote={updateNote} note={note} />
          ))
        ) : (
          <p className="text-white text-center">No notes available</p>
        )}
      </div>

      {/* Bootstrap Edit Modal */}
      <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content" style={{ backgroundColor: "#333", border: "2px solid #FFD700" }}>
            <div className="modal-header border-bottom border-warning">
              <h5 className="modal-title" id="editModalLabel" style={{ color: "#FFD700" }}>
                Edit Note
              </h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body" style={{ color: "#FFD700" }}>
              <div className="mb-3">
                <label className="form-label" style={{ color: "#FFD700" }}>Title</label>
                <input
                  type="text"
                  className="form-control bg-dark text-warning border border-warning"
                  name="title"
                  value={modalNote.title}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" style={{ color: "#FFD700" }}>Description</label>
                <textarea
                  className="form-control bg-dark text-warning border border-warning"
                  name="description"
                  value={modalNote.description}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label" style={{ color: "#FFD700" }}>Tag</label>
                <select
                  className="form-select bg-dark text-warning border border-warning"
                  name="tag"
                  value={modalNote.tag}
                  onChange={handleChange}
                >
                  <option value="default">Default</option>
                  <option value="personal">Personal</option>
                  <option value="work">Work</option>
                  <option value="important">Important</option>
                  <option value="miscellaneous">Miscellaneous</option>
                </select>
              </div>
            </div>
            <div className="modal-footer border-top border-warning">
              <button type="button" className="btn btn-secondary" id="closeModal" data-bs-dismiss="modal">Close</button>
              <button
                type="button"
                className="btn"
                style={{ backgroundColor: "#FFD700", color: "#122B54", fontWeight: "bold" }}
                onClick={handleSave}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;