import React, { useState } from 'react';
import axios from 'axios';

const MentorCoursesModal = ({ token, onComplete }) => {
  const [courses, setCourses] = useState(['', '']);
  const [error, setError] = useState('');

  const handleCourseChange = (index, value) => {
    const newCourses = [...courses];
    newCourses[index] = value;
    setCourses(newCourses);
  };

  const handleAddCourse = () => {
    if (courses.length < 5) {
      setCourses([...courses, '']);
    }
  };

  const handleRemoveCourse = (index) => {
    if (courses.length > 2) {
      const newCourses = courses.filter((_, i) => i !== index);
      setCourses(newCourses);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const filledCourses = courses.map(c => c.trim()).filter(c => c !== '');
    if (filledCourses.length < 2) {
      setError('Please enter at least 2 courses.');
      return;
    }
    setError('');
    try {
      await Promise.all(
        filledCourses.map(courseTitle =>
          axios.post(
            'http://localhost:5000/api/courses',
            { title: courseTitle },
            { headers: { Authorization: `Bearer ${token}` } }
          )
        )
      );
      onComplete();
    } catch (err) {
      console.error(err);
      setError('Failed to save courses. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/3 p-6 relative">
        <h2 className="text-xl font-semibold mb-4">Enter Your Courses</h2>
        <p className="text-gray-600 mb-4">
          Please enter between 2 and 5 courses you can mentor in:
        </p>
        <form onSubmit={handleSubmit}>
          {courses.map((course, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={course}
                onChange={(e) => handleCourseChange(index, e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Course name"
                required
              />
              {courses.length > 2 && (
                <button
                  type="button"
                  onClick={() => handleRemoveCourse(index)}
                  className="ml-2 text-red-500 text-2xl leading-none"
                >
                  &times;
                </button>
              )}
            </div>
          ))}
          {courses.length < 5 && (
            <button
              type="button"
              onClick={handleAddCourse}
              className="mb-4 text-blue-600 hover:underline"
            >
              + Add another course
            </button>
          )}
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Save Courses
          </button>
        </form>
      </div>
    </div>
  );
};

export default MentorCoursesModal;
