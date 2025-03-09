import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../context/notes/NoteContext";

const Home = ({ showAlert }) => {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const navigate = useNavigate();

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  // Check for authentication on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token:", token); // Debugging
    if (!token) {
      console.log("Redirecting to login...");
      navigate("/login");
    }
  }, [navigate]);

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "default" }); // Reset form after submission
    showAlert("Note created successfully.", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#0A1F44" }}
    >
      <div
        className="container p-4 rounded shadow-lg"
        style={{
          maxWidth: "500px",
          backgroundColor: "#333",
          border: "2px solid #FFD700",
          color: "#E6B800",
          boxShadow: "0px 4px 15px rgba(255, 215, 0, 0.3)",
        }}
      >
        <h2 className="text-center" style={{ color: "#FFD700" }}>Create A Note</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label" style={{ color: "#E6B800" }}>Title</label>
            <input
              type="text"
              className="form-control bg-transparent text-light border border-warning"
              id="title"
              name="title"
              value={note.title}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label" style={{ color: "#E6B800" }}>Description</label>
            <input
              type="text"
              className="form-control bg-transparent text-light border border-warning"
              id="description"
              name="description"
              value={note.description}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label" style={{ color: "#E6B800" }}>Tag</label>
            <select
              className="form-select text-light border border-warning"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={onChange}
              style={{
                backgroundColor: "#333",
                color: "#E6B800",
                border: "1px solid #FFD700",
              }}
            >
              <option value="default">Default</option>
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="important">Important</option>
              <option value="miscellaneous">Miscellaneous</option>
            </select>
          </div>
          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: "#FFD700",
              color: "#122B54",
              fontWeight: "bold",
            }}
            onClick={handleClick}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
