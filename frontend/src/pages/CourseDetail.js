import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCourses } from '../api/courses';
import './CourseList.css'; // Import the updated CSS

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    getCourses().then((courses) => {
      const selectedCourse = courses.find((course) => course.id === parseInt(id));
      setCourse(selectedCourse);
    });
  }, [id]);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{course.title}</h2>
      <p>{course.description}</p>
    </div>
  );
};

export default CourseDetail;
