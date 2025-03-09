import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const Navbar = () => {
  let location = useLocation();
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className='Navbar'>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">INoteBook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/notes" ? "active" : ""}`} aria-current="page" to="/notes">Notes</Link>
              </li>
            </ul>

            <div className="d-flex">
              {location.pathname === "/" ? (
                <button className="btn btn-danger text-white" onClick={handleLogout}>Logout</button>
              ) : (
                <>
                  <Link className="btn btn-warning text-black me-2 custom-btn" to="/signup">Signup</Link>
                  <Link className="btn btn-warning text-black custom-btn" to="/login">Login</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <style>{`
        .nav-link {
          color: white !important;
        }
        .nav-link.active {
          color: yellow !important;
          font-weight: bold;
        }
        .custom-btn:hover {
          background-color: #333 !important;
          color: yellow !important;
          border-color: yellow !important;
        }
      `}</style>
    </div>
  );
}

export default Navbar;