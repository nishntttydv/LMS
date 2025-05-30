// src/pages/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import './Dashboard.css';  // Import the CSS file for styling
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [students, setStudents] = useState([
    { id: 'S12345', name: 'Aarav Patel', progress: 70, email: 'aarav@learnit.com' },
    { id: 'S12346', name: 'Ishaan Gupta', progress: 85, email: 'ishaan@learnit.com' },
    { id: 'S12347', name: 'Priya Sharma', progress: 90, email: 'priya@learnit.com' },
    { id: 'S12348', name: 'Neha Verma', progress: 80, email: 'neha@learnit.com' },
    { id: 'S12349', name: 'Vikram Yadav', progress: 75, email: 'vikram@learnit.com' },
    { id: 'S12350', name: 'Rajeev Singh', progress: 65, email: 'rajeeve@learnit.com' },
    { id: 'S12351', name: 'Sanya Mehta', progress: 95, email: 'sanya@learnit.com' },
    { id: 'S12352', name: 'Manish Kumar', progress: 60, email: 'manish@learnit.com' },
    { id: 'S12353', name: 'Simran Kaur', progress: 85, email: 'simran@learnit.com' },
    { id: 'S12354', name: 'Karan Singh', progress: 88, email: 'karan@learnit.com' },
    { id: 'S12355', name: 'Radhika Joshi', progress: 92, email: 'radhika@learnit.com' },
    { id: 'S12356', name: 'Arjun Reddy', progress: 77, email: 'arjun@learnit.com' },
    { id: 'S12357', name: 'Tanvi Agarwal', progress: 82, email: 'tanvi@learnit.com' },
    { id: 'S12358', name: 'Abhinav Verma', progress: 93, email: 'abhinav@learnit.com' },
    { id: 'S12359', name: 'Aditi Kapoor', progress: 78, email: 'aditi@learnit.com' },
    { id: 'S12360', name: 'Siddharth Ramesh', progress: 89, email: 'siddharth@learnit.com' },
    { id: 'S12361', name: 'Pooja Sharma', progress: 65, email: 'pooja@learnit.com' },
    { id: 'S12362', name: 'Rahul Bhatia', progress: 70, email: 'rahul@learnit.com' },
    { id: 'S12363', name: 'Madhuri Joshi', progress: 80, email: 'madhuri@learnit.com' },
    { id: 'S12364', name: 'Anjali Desai', progress: 72, email: 'anjali@learnit.com' }
  ]);

  
  const [teachers, setTeachers] = useState([
    { id: 'T98765', name: 'Dr. Ramesh Kumar', email: 'ramesh@example.com' },
    { id: 'T98766', name: 'Geeta Nair', email: 'geeta@example.com' },
  ]);

  const [newStudent, setNewStudent] = useState({ id: '', name: '', progress: '', email: '' });
  const [newTeacher, setNewTeacher] = useState({ id: '', name: '', email: '' });

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  useEffect(() => {
    // Fetch initial data from API (if any)
    // For now, using static data
  }, []);

  // Add new student
  const handleAddStudent = () => {
    setStudents([...students, newStudent]);
    setNewStudent({ id: '', name: '', progress: '', email: '' });  // Reset input fields
  };

  // Add new teacher
  const handleAddTeacher = () => {
    setTeachers([...teachers, newTeacher]);
    setNewTeacher({ id: '', name: '', email: '' });  // Reset input fields
  };

  // Edit student
  const handleEditStudent = (student) => {
    setSelectedStudent(student);
  };

  // Save updated student
  const handleSaveStudent = () => {
    setStudents(students.map(student => student.id === selectedStudent.id ? selectedStudent : student));
    setSelectedStudent(null);
  };

  // Edit teacher
  const handleEditTeacher = (teacher) => {
    setSelectedTeacher(teacher);
  };

  // Save updated teacher
  const handleSaveTeacher = () => {
    setTeachers(teachers.map(teacher => teacher.id === selectedTeacher.id ? selectedTeacher : teacher));
    setSelectedTeacher(null);
  };

  // Delete student
  const handleDeleteStudent = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  // Delete teacher
  const handleDeleteTeacher = (id) => {
    setTeachers(teachers.filter(teacher => teacher.id !== id));
  };

  // Progress chart data for visualizing student progress
  const progressChartData = {
    labels: students.map(student => student.name),
    datasets: [{
      label: 'Student Progress',
      data: students.map(student => student.progress),
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderWidth: 1,
    }],
  };

  return (
    <div className="dashboard-container admin-dashboard">
      <h2>Welcome, Admin</h2>

      <div className="admin-dashboard-actions">
        <h3>Manage Students</h3>
        
        {/* Add Student Form */}
        <div className="add-student-form">
          <input
            type="text"
            value={newStudent.id}
            onChange={(e) => setNewStudent({ ...newStudent, id: e.target.value })}
            placeholder="Student ID"
          />
          <input
            type="text"
            value={newStudent.name}
            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            placeholder="Student Name"
          />
          <input
            type="number"
            value={newStudent.progress}
            onChange={(e) => setNewStudent({ ...newStudent, progress: e.target.value })}
            placeholder="Progress"
          />
          <input
            type="email"
            value={newStudent.email}
            onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
            placeholder="Email"
          />
          <button onClick={handleAddStudent}>Add New Student</button>
        </div>

        {/* Students Table */}
        <div className="student-list">
          <table>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Progress</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.progress}%</td>
                  <td>{student.email}</td>
                  <td>
                    <button onClick={() => handleEditStudent(student)}>Edit</button>
                    <button onClick={() => handleDeleteStudent(student.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Student Modal */}
        {selectedStudent && (
          <div className="modal">
            <h3>Edit Student</h3>
            <input
              type="text"
              value={selectedStudent.name}
              onChange={(e) => setSelectedStudent({ ...selectedStudent, name: e.target.value })}
              placeholder="Student Name"
            />
            <input
              type="number"
              value={selectedStudent.progress}
              onChange={(e) => setSelectedStudent({ ...selectedStudent, progress: e.target.value })}
              placeholder="Progress"
            />
            <button onClick={handleSaveStudent}>Save</button>
            <button onClick={() => setSelectedStudent(null)}>Cancel</button>
          </div>
        )}
      </div>

      {/* Line Chart for Student Progress */}
      <div className="chart-container">
        <h3>Student Progress Overview</h3>
        <Line data={progressChartData} />
      </div>

      <div className="admin-dashboard-actions">
        <h3>Manage Teachers</h3>

        {/* Add Teacher Form */}
        <div className="add-teacher-form">
          <input
            type="text"
            value={newTeacher.id}
            onChange={(e) => setNewTeacher({ ...newTeacher, id: e.target.value })}
            placeholder="Teacher ID"
          />
          <input
            type="text"
            value={newTeacher.name}
            onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
            placeholder="Teacher Name"
          />
          <input
            type="email"
            value={newTeacher.email}
            onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
            placeholder="Email"
          />
          <button onClick={handleAddTeacher}>Add New Teacher</button>
        </div>

        {/* Teachers Table */}
        <div className="teacher-list">
          <table>
            <thead>
              <tr>
                <th>Teacher ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher.id}>
                  <td>{teacher.id}</td>
                  <td>{teacher.name}</td>
                  <td>{teacher.email}</td>
                  <td>
                    <button onClick={() => handleEditTeacher(teacher)}>Edit</button>
                    <button onClick={() => handleDeleteTeacher(teacher.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Teacher Modal */}
        {selectedTeacher && (
          <div className="modal">
            <h3>Edit Teacher</h3>
            <input
              type="text"
              value={selectedTeacher.name}
              onChange={(e) => setSelectedTeacher({ ...selectedTeacher, name: e.target.value })}
              placeholder="Teacher Name"
            />
            <input
              type="email"
              value={selectedTeacher.email}
              onChange={(e) => setSelectedTeacher({ ...selectedTeacher, email: e.target.value })}
              placeholder="Teacher Email"
            />
            <button onClick={handleSaveTeacher}>Save</button>
            <button onClick={() => setSelectedTeacher(null)}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
