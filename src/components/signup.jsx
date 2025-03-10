import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://inotebook-backenda.vercel.app/api/auth/register", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      const json = await response.json(); // Always parse JSON first
  
      if (json.success) {
        localStorage.setItem('token', json.token);
        navigate('/');
        props.showAlert("Account Created Successfully", "success");
      } else {
        // Handle case when email already exists
        props.showAlert("Invalid Details", "danger");
      }
    } catch (error) {
      props.showAlert("Something Went Wrong!", "danger");
    }
  };
  
  

  return (
    <div className="signup-page">
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card p-4 mt-5 shadow">
              <h3 className="text-center mb-3 text-white">Sign Up</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label text-white">Name</label>
                  <input type="text" name="name" className="form-control custom-input" id="name" placeholder="Enter name" required value={formData.name} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label text-white">Email address</label>
                  <input type="email" name="email" className="form-control custom-input" id="email" placeholder="Enter email" required value={formData.email} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label text-white">Password</label>
                  <input type="password" name="password" className="form-control custom-input" id="password" placeholder="Enter password" required value={formData.password} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-warning w-100">Sign Up</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        body {
          background-color: #333 !important;
        }
        .custom-input {
          background-color: #333 !important;
          color: white !important;
          border: 1px solid #555 !important;
        }
        .custom-input::placeholder {
          color: #bbb !important;
        }
        .card {
          background-color: #444 !important;
          border: none !important;
          margin-top: 6rem;
        }
      `}</style>
    </div>
  );
};

export default Signup;
