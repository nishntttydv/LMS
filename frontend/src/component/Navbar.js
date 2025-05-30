// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file for styling

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        {/* Add the About Us link here */}
        <li><Link to="/about-us">About Us</Link></li> {/* Added About Us link */}
      </ul>
    </nav>
  );
};

export default Navbar;

