// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate(); // Initialize the navigate hook

  // Simulating user role (can be fetched from a backend in real app)
  const [role, setRole] = useState(null); // Initially set to null to redirect if not logged in

  // Dummy data for students and courses
  const studentCourses = [
    { id: 'S001', name: 'Mathematics', progress: 85 },
    { id: 'S002', name: 'English Language Arts', progress: 90 },
    { id: 'S003', name: 'Science', progress: 80 },
    { id: 'S004', name: 'Social Studies', progress: 75 },
    { id: 'S005', name: 'Art', progress: 95 },
    { id: 'S006', name: 'Physical Education', progress: 88 },
    { id: 'S007', name: 'Music', progress: 92 },
    { id: 'S008', name: 'Computer Science', progress: 70 },
    { id: 'S009', name: 'History', progress: 82 },
    { id: 'S010', name: 'Geography', progress: 78 },
  ];

  const teacherStudents = [
    { id: 1, name: 'Aarav Patel', course: 'Introduction to React', attendance: [] },
    { id: 2, name: 'Priya Sharma', course: 'JavaScript Basics', attendance: [] },
    { id: 3, name: 'Rahul Desai', course: 'Web Development Essentials', attendance: [] },
    // ... More students
  ];

  // Function to toggle attendance for a student (Present/Absent)
  const markAttendance = (studentId, status) => {
    const updatedStudents = teacherStudents.map(student => {
      if (student.id === studentId) {
        student.attendance.push({ date: new Date().toLocaleDateString(), status });
      }
      return student;
    });
    setRole('teacher');
  };

  // If there's no role (meaning user hasn't logged in), redirect to login
  useEffect(() => {
    if (!role) {
      navigate('/login'); // Redirect to login page if not logged in
    }
  }, [role, navigate]);

  return (
    <div className="dashboard-container">
      <h2>Welcome to your Dashboard</h2>

      {/* Buttons to toggle between student and teacher view */}
      <div className="role-selector">
        <button onClick={() => setRole('student')}>Student Dashboard</button>
        <button onClick={() => setRole('teacher')}>Teacher Dashboard</button>
      </div>

      {/* Conditional Rendering based on Role */}
      {role === 'student' ? (
        <div className="student-dashboard">
          <h3>Your Enrolled Courses</h3>
          <ul>
            {studentCourses.map(course => (
              <li key={course.id}>
                <strong>{course.name}</strong>
                <div>Progress: {course.progress}%</div>
              </li>
            ))}
          </ul>
        </div>
      ) : role === 'teacher' ? (
        <div className="teacher-dashboard">
          <h3>Students Attendance</h3>

          {/* Attendance Table */}
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Course</th>
                <th>Mark Attendance</th>
                <th>Attendance History</th>
              </tr>
            </thead>
            <tbody>
              {teacherStudents.map(student => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.course}</td>
                  <td>
                    <button onClick={() => markAttendance(student.id, 'Present')}>Present</button>
                    <button onClick={() => markAttendance(student.id, 'Absent')}>Absent</button>
                  </td>
                  <td>
                    {student.attendance.length > 0 ? (
                      <ul>
                        {student.attendance.map((att, index) => (
                          <li key={index}>{att.date}: {att.status}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>No attendance marked yet</p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Please log in to access the dashboard.</p> // Fallback message if no role is set
      )}
    </div>
  );
};

export default Dashboard;
