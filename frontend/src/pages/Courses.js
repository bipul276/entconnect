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
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Courses</h2>
      <ul className="space-y-4">
        {courses.map(course => (
          <li key={course._id} className="border border-gray-200 rounded p-4">
            <h4 className="font-semibold text-lg">{course.title}</h4>
            <p className="text-gray-700">{course.description}</p>
            <p className="text-sm text-gray-500 mt-2">By: {course.mentor.username}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Courses;
