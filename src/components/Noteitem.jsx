import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

const NoteItem = ( props ) => {
    const context = useContext(NoteContext);
    const { DeleteNote } = context;
    const { note, updateNote, showAlert } = props;

    const formattedDate = new Date(note.date).toISOString().split("T")[0];

    const handleDelete = () => {
        DeleteNote(note._id);
        showAlert("Note deleted successfully", "danger");
    };

    const handleUpdate = () => {
        updateNote(note);
    };

    return (
        <div className="col-md-3 d-flex">
            <div
                className="card text-white mb-3 flex-grow-1 d-flex flex-column"
                style={{
                    backgroundColor: "#333",
                    border: "1px solid #FFC107",
                    padding: "15px",
                    borderRadius: "10px",
                }}
            >
                <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start">
                        <h5 className="card-title text-warning" style={{ marginBottom: "5px" }}>{note.title}</h5>
                        <div className="d-flex gap-2">
                            <button
                                className="btn p-0"
                                style={{ background: "transparent", border: "none", color: "#FFD700" }}
                                onMouseEnter={(e) => (e.target.style.color = "#fff")}
                                onMouseLeave={(e) => (e.target.style.color = "#FFD700")}
                                onClick={handleUpdate}
                            >
                                <i className="fas fa-edit"></i>
                            </button>
                            <button
                                className="btn p-0"
                                style={{ background: "transparent", border: "none", color: "#DC3545" }}
                                onMouseEnter={(e) => (e.target.style.color = "#fff")}
                                onMouseLeave={(e) => (e.target.style.color = "#DC3545")}
                                onClick={handleDelete}
                            >
                                <i className="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <p className="card-text flex-grow-1">{note.description}</p>
                    <small className="text-end mt-2" style={{ color: "#FFD700" }}>{formattedDate}</small>
                    <div className="mt-auto pt-2">
                        <span className="badge bg-warning text-dark w-100 text-center">{note.tag}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoteItem;
