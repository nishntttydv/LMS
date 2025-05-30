// src/pages/StudentDashboard.js
import React, { useState, useEffect } from 'react';
import './Dashboard.css';  // Import the CSS file for styling
import { jwtDecode } from 'jwt-decode';  // Corrected import for jwt-decode
import { Line } from 'react-chartjs-2';  // For the progress chart
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registering chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StudentDashboard = () => {
  const [studentName, setStudentName] = useState(""); // State to hold the student name
  const [studentId, setStudentId] = useState(""); // State to hold the student ID
  const [studentEmail, setStudentEmail] = useState(""); // State to hold the student email
  const [enrolledCourses, setEnrolledCourses] = useState([]); // State for courses the student is enrolled in

  // Fetch student data when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        // Decode the token to get user details
        const decodedToken = jwtDecode(token);
        console.log("Decoded Token:", decodedToken);  // Log the decoded token

        // Set student name, email, and id from the decoded token
        setStudentName(decodedToken.username || (decodedToken.firstName && decodedToken.lastName 
          ? `${decodedToken.firstName} ${decodedToken.lastName}` 
          : "Unknown User"));
        setStudentEmail(decodedToken.email || "No Email Found");
        setStudentId(decodedToken.id || "No ID Found");

        // Set the enrolled courses from the decoded token
        setEnrolledCourses(decodedToken.enrolledCourses || []);
      } catch (err) {
        console.error("Error decoding token", err);
      }
    } else {
      console.log("No token found");
    }
  }, []);

  // Progress chart data for visualizing student progress
  const progressChartData = {
    labels: enrolledCourses.map(course => course.title),
    datasets: [{
      label: 'Course Progress',
      data: enrolledCourses.map(course => course.progress),
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderWidth: 1,
    }],
  };

  return (
    <div className="dashboard-container student-dashboard">
      <h2>Welcome, {studentName || "Loading..."} (ID: {studentId || "Loading..."})</h2>
      <p>Email: {studentEmail || "Loading..."}</p>

      <div className="course-list">
        <h3>Your Enrolled Courses</h3>
        {enrolledCourses.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Course Title</th>
                <th>Progress (%)</th>
              </tr>
            </thead>
            <tbody>
              {enrolledCourses.map((course) => (
                <tr key={course.id}>
                  <td>{course.id}</td>
                  <td>{course.title}</td>
                  <td>{course.progress}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>You are not enrolled in any courses yet.</p>
        )}
      </div>

      {/* Line Chart for Course Progress */}
      <div className="chart-container">
        <h3>Your Course Progress Overview</h3>
        <Line data={progressChartData} />
      </div>
    </div>
  );
};

export default StudentDashboard;
