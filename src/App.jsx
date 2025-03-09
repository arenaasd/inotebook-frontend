import "./App.css";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/home";
import Notes from "./components/notes";
import Signup from "./components/signup"
import Login from "./components/login"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import { Alert } from "./components/Alert";

function App() {
  const [alert, setAlert] = useState(null)
  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 3000);
  };
  return (
    <NoteState> {/* Fix: Wrap everything inside NoteState */}
      <Router>
        <Alert alert={alert} />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home showAlert={showAlert} />} />
          <Route path="/notes" element={<Notes showAlert={showAlert} />} />
          <Route path="/login" element={<Login showAlert={showAlert} />} />
          <Route path="/signup" element={<Signup showAlert={showAlert} />} />
        </Routes>
      </Router>
    </NoteState>
  );
}

export default App;
