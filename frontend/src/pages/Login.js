import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // For making HTTP requests
import { jwtDecode } from 'jwt-decode'; // Correct import statement
import './Login.css'; // Importing the CSS for login styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Check email format (must end with @learnit.com)
    if (!email.endsWith('@learnit.com')) {
      setError('Please enter a valid email with @learnit.com');
      return;
    }

    try {
      // Send login credentials to the backend
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username: email,
        password,
      });

      // On success, store the JWT token in localStorage or sessionStorage
      localStorage.setItem('token', response.data.token);

      // Redirect user based on role (assuming role is returned in the JWT payload)
      if (response.data.token) {
        const decodedToken = jwtDecode(response.data.token); // Decoding the JWT token
        const role = decodedToken.role;

        if (role === 'admin') {
          navigate('/admin-dashboard');
        } else if (role === 'student') {
          navigate('/student-dashboard');
        } else if (role === 'teacher') {
          navigate('/teacher-dashboard');
        }
      }
    } catch (err) {
      // Improve error handling
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Invalid email or password');
      } else {
        setError('Network error. Please try again later.');
      }
      console.error('Login error:', err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="btn-primary">Login</button>
        </form>
        <p>Don't have an account? <a href="/signup">Sign up</a></p>
      </div>
    </div>
  );
};

export default Login;
