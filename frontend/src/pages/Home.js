// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import BackgroundVideo from '../component/BackgroundVideo'; // Adjust the path if necessary
import './Home.css'; // Make sure your styles are correct

const Home = () => {
  return (
    <div className="home">
      <BackgroundVideo /> {/* Background video */}

      {/* Header Section with Navbar */}
      <header className="home-header">
        <nav className="navbar">
          <div className="logo">Learn It</div>
          <div className="nav-links">
            {/* Existing Navbar Links */}
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/courses" className="nav-link">Courses</Link>
            <Link to="/about-us" className="nav-link">About Us</Link>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-link">Signup</Link>
          </div>
        </nav>

        <div className="hero-section">
          <h1>Learn from the best</h1>
          <p>Join our community and start your learning journey today!</p>

          {/* Button centered within the hero section */}
          <div className="explore-btn-container">
            <Link to="/courses" className="btn-primary">Explore Courses</Link>
          </div>
        </div>
      </header>

      {/* Parallax Section */}
      <div className="parallax-section">
        <div className="parallax-content">
          <h2>Experience Learning Like Never Before</h2>
          <p>Engaging courses designed to help you succeed.</p>
        </div>
      </div>

      {/* Features Section */}
      <section className="home-features">
        <h2>Our Features</h2>
        <div className="features-container">
          <div className="feature">
            <h3>Interactive Learning</h3>
            <p>Engage with interactive content and quizzes.</p>
          </div>
          <div className="feature">
            <h3>Expert Instructors</h3>
            <p>Learn from industry professionals and experts.</p>
          </div>
          <div className="feature">
            <h3>Flexible Schedule</h3>
            <p>Learn at your own pace, anytime, anywhere.</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="home-footer">
        <p>&copy; 2024 Learn It. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
