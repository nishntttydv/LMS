import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';  // Corrected import for named export from 'jwt-decode'
import './Dashboard.css';  // Import the CSS file for styling

const TeacherDashboard = () => {
  const [teacherName, setTeacherName] = useState("");  // State to hold the teacher's name
  const [attendanceStatus, setAttendanceStatus] = useState({});

  // Sample course list for demonstration
  const courseList = [
    {
      id: 'C101',
      title: 'Math 101',
      students: [
        { id: 'S12345', name: 'Aarav Patel', progress: 70, attendance: 'Present' },
        { id: 'S12346', name: 'Ishaan Gupta', progress: 85, attendance: 'Absent' },
        { id: 'S12347', name: 'Priya Sharma', progress: 90, attendance: 'Present' },
        { id: 'S12348', name: 'Neha Verma', progress: 75, attendance: 'Present' },
        { id: 'S12349', name: 'Vikram Yadav', progress: 80, attendance: 'Absent' },
        { id: 'S12350', name: 'Rajeev Singh', progress: 65, attendance: 'Present' },
        // More students...
      ]
    },
    {
      id: 'C102',
      title: 'English 101',
      students: [
        { id: 'S12345', name: 'Aarav Patel', progress: 85, attendance: 'Present' },
        { id: 'S12346', name: 'Ishaan Gupta', progress: 75, attendance: 'Present' },
        { id: 'S12347', name: 'Priya Sharma', progress: 80, attendance: 'Absent' },
        { id: 'S12348', name: 'Neha Verma', progress: 60, attendance: 'Present' },
        { id: 'S12349', name: 'Vikram Yadav', progress: 90, attendance: 'Absent' },
        { id: 'S12350', name: 'Rajeev Singh', progress: 75, attendance: 'Present' },
        // More students...
      ]
    }
  ];

  // Function to toggle attendance status of students
  const toggleAttendance = (studentId, courseId) => {
    setAttendanceStatus((prevState) => ({
      ...prevState,
      [`${courseId}-${studentId}`]: prevState[`${courseId}-${studentId}`] === 'Present' ? 'Absent' : 'Present'
    }));
  };

  useEffect(() => {
    // Get the JWT token from localStorage
    const token = localStorage.getItem('token');
  
    if (token) {
      try {
        // Decode the token to get user details
        const decodedToken = jwtDecode(token);
        console.log("Decoded Token:", decodedToken);  // Log the decoded token
  
        // Assuming the decoded token has a `username` or `firstName` and `lastName` property
        const userName = decodedToken.username || (decodedToken.firstName && decodedToken.lastName 
          ? `${decodedToken.firstName} ${decodedToken.lastName}` 
          : "Unknown User");
  
        // Set the teacher's name from the token (you can use first name + last name or just username)
        setTeacherName(userName);
      } catch (err) {
        console.error("Error decoding token", err);
      }
    } else {
      // If no token, handle the case (redirect to login or show error)
      console.log("No token found");
    }
  }, []);

  return (
    <div className="dashboard-container teacher-dashboard">
      {/* Display teacher's name dynamically */}
      <h2>Welcome, {teacherName || "Loading..."} (ID: T98765)</h2>
      <p>Here are the courses you are teaching:</p>

      {courseList.map((course) => (
        <div key={course.id} className="course-container">
          <h3>{course.title}</h3>
          <table>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Progress (%)</th>
                <th>Attendance</th>
                <th>Mark Attendance</th>
              </tr>
            </thead>
            <tbody>
              {course.students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.progress}%</td>
                  <td>
                    <span className={`attendance-status ${attendanceStatus[`${course.id}-${student.id}`] === 'Absent' ? 'absent' : ''}`}>
                      {attendanceStatus[`${course.id}-${student.id}`] || student.attendance}
                    </span>
                  </td>
                  <td>
                    <button className="attendance-btn" onClick={() => toggleAttendance(student.id, course.id)}>
                      {attendanceStatus[`${course.id}-${student.id}`] === 'Present' ? 'Mark Absent' : 'Mark Present'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default TeacherDashboard;
