import React, { useEffect, useState } from 'react';
import { getCourses } from '../api/courses';  // Your API call
import './CourseList.css'; // Import the updated CSS

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
     getCourses().then((coursesData) => {
        setCourses(coursesData);
     });
  }, []);

  return (
     <div className="course-list"> {/* No inline style here */}
        <h2>Our Courses</h2>
        <div className="courses">
           {courses.map((course) => (
              <div key={course.id} className="course-card">
                 <div className="course-card-content">
                    <h3>{course.title}</h3>
                    <p>{course.description}</p>
                    <a href={course.ncertLink} target="_blank" rel="noopener noreferrer">
                       View Course
                    </a>
                 </div>
              </div>
           ))}
        </div>
     </div>
  );
};


export default CourseList;
