import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

const Login = (props) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  let navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://inotebook-backenda.vercel.app/api/auth/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      const contentType = response.headers.get("content-type");
  
      if (contentType && contentType.includes("application/json")) {
        const json = await response.json();
        console.log("JSON Response:", json);
        if(json.success) {
          localStorage.setItem('token', json.token)
          navigate('/')
          props.showAlert("Logged in Successfully", "success");
        } else{
          props.showAlert("Invalid Credentials", "danger");
        }
      } else {
        const text = await response.text(); // Handle plain text response
      
      }
    } catch (error) {
      props.showAlert("Something Went Wrong!", "danger");
    }
  };
  

  return (
    <div className="login-page">
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card p-4 mt-5 shadow">
              <h3 className="text-center mb-3 text-white">Login</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label text-white">Email address</label>
                  <input type="email" name="email" className="form-control custom-input" id="email" placeholder="Enter email" minLength={4} required value={formData.email} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label text-white">Password</label>
                  <input type="password" name="password" className="form-control custom-input" id="password" placeholder="Enter password" required minLength={4} value={formData.password} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-warning w-100">Login</button>
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

export default Login;
