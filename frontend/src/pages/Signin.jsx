import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signin.css';
import { toast } from 'react-toastify';


const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For redirection after success

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!fullName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    setError('');

    try {
      const baseUrl = import.meta.env.VITE_API_BASE;

      const response = await fetch(`${baseUrl}/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: fullName,
          email: email,
          password: password
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User registered ✅", data);
        toast.success("Registration successful! 🎉");
        navigate('/'); // Redirect to login or home
      } else {
        const errorText = await response.text();
        console.error("Registration failed ❌", errorText);
        toast.error("Registration failed. Please try again.");
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error connecting to backend ❌", error);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <h3 className="mb-4 text-center">Create Your Account 👥</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

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
                placeholder="Create password"
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

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Error message */}
          {error && (
            <div className="alert alert-danger text-center">{error}</div>
          )}

          <button type="submit" className="btn btn-primary w-100 mb-3">Sign Up</button>

          <div className="text-center">
            <span>Already have an account? </span>
            <Link to="/" className="text-primary text-decoration-none">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
