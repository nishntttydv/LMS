// src/pages/Signup.js
import React, { useState } from 'react';
import axios from 'axios'; // For making HTTP requests
import './Signup.css'; // Import CSS for Signup page

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('student'); // Default role can be student
  const [error, setError] = useState(''); // Error state for handling errors

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if first and last name are properly split
    const [firstName, lastName] = name.split(' ');
  
    if (!firstName || !lastName) {
      alert("Please enter both first and last names.");
      return;
    }
  
    if (!email || !password || !confirmPassword || !role) {
      alert('All fields are required');
      return;
    }
  
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
  
    // Send the correct data to the backend
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username: email,   // Use email as the username
        email,             // Send email as email (this was missing before)
        password,
        role,
        firstName,
        lastName,
      });
  
      alert('Account created successfully. Please login!');
      window.location.href = '/login'; // Redirect to login page
    } catch (err) {
      console.error('Signup error:', err);
      if (err.response && err.response.data) {
        alert(err.response.data.message || 'There was an error creating your account');
      } else {
        alert('Network error. Please try again later.');
      }
    }
  };
  
  
  
  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Create an Account</h2>
        {error && <p className="error-message">{error}</p>} {/* Show error message if any */}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="btn-primary">Sign Up</button>

          <p>Already have an account? <a href="/login">Login</a></p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
