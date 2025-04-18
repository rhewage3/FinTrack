import React, {useState} from "react";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'
import { useNavigate } from "react-router-dom"; // 👈 Import here


const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate(); // 👈 Create the navigation object
    const handleLogin = (e) => {
      e.preventDefault();
  
      
      navigate("/dashboard"); // 👈 Navigate to dashboard on success
    };
  

    return(
<div className="login-container">
  <div className="login-card">
    <h3 className="mb-4 text-center">Welcome Back 👋</h3>
    <form onSubmit={handleLogin}>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input type="email" className="form-control" placeholder="Enter email" />
      </div>

      <div className="mb-3">
        <label className="form-label">Password</label>
        <div className="input-group">
          <input
            type={showPassword ? 'text' : 'password'}
            className="form-control"
            placeholder="Enter password"
          />
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setShowPassword(prev => !prev)}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <a href="#" className="text-decoration-none small">Forgot password?</a>
      </div>

      <button type="submit" className="btn btn-primary w-100 mb-3">Login</button>

      <div className="text-center">
        <span>Don’t have an account? </span>
        <a href="/register" className="text-primary text-decoration-none">Sign Up</a>
      </div>
    </form>
  </div>
</div>


    );

}

export default Login;