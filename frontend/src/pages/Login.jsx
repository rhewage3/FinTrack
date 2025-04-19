import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import { toast } from 'react-toastify';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in both fields.");
      return;
    }

    try {
      const baseUrl = import.meta.env.VITE_API_BASE;
      const response = await fetch(`${baseUrl}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(`Welcome, ${data.user.name}! 🎉`);

        // 👉 Save token & user to localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        navigate("/dashboard");
      } else {
        toast.error("Invalid email or password ❌");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Server error. Try again later.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h3 className="mb-4 text-center">Welcome Back 👋</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            <Link to="/register" className="text-primary text-decoration-none">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
