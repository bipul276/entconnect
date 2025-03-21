import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CourseSearchTab = () => {
  const [courses, setCourses] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/courses')
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filtered = courses.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Course Search</h3>
      <div className="mb-4">
        <label className="block text-gray-700">Search Courses:</label>
        <input
          type="text"
          className="border border-gray-300 rounded px-3 py-2 w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type course title..."
        />
      </div>
      <ul className="space-y-2">
        {filtered.map((course) => (
          <li key={course._id} className="p-3 border border-gray-200 rounded">
            <h4 className="font-semibold">{course.title}</h4>
            <p className="text-sm text-gray-600">{course.description}</p>
            <p className="text-xs text-gray-500 mt-1">By {course.mentor.username}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseSearchTab;
