import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/courses')
      .then(res => setCourses(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container section">
      <h2>Courses</h2>
      <ul>
        {courses.map(course => (
          <li key={course._id}>
            <h4>{course.title}</h4>
            <p>{course.description}</p>
            <p>By: {course.mentor.username}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Courses;
