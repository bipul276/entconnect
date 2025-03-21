import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecommendedMentors = () => {
  const [courses, setCourses] = useState([]);
  const [mentorList, setMentorList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/courses')
      .then((res) => {
        const coursesData = res.data;
        setCourses(coursesData);
        const uniqueMentors = {};
        coursesData.forEach((course) => {
          if (course.mentor && course.mentor._id) {
            uniqueMentors[course.mentor._id] = course.mentor;
          }
        });
        setMentorList(Object.values(uniqueMentors));
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredMentors = mentorList.filter((mentor) => {
    const mentorCourses = courses.filter(
      (course) => course.mentor && course.mentor._id === mentor._id
    );
    if (!searchTerm) return true;
    return mentorCourses.some((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="mt-8">
      <h4 className="text-xl font-semibold mb-2">Recommended Mentors</h4>
      <input
        type="text"
        placeholder="Search mentors by course..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
      />
      {filteredMentors.length > 0 ? (
        <ul className="space-y-3">
          {filteredMentors.map((mentor) => {
            const mentorCourses = courses
              .filter(
                (course) =>
                  course.mentor && course.mentor._id === mentor._id
              )
              .map((course) => course.title)
              .join(', ');
            return (
              <li key={mentor._id} className="p-3 border border-gray-200 rounded">
                <p className="font-semibold">{mentor.username}</p>
                <p className="text-sm text-gray-600">Courses: {mentorCourses}</p>
                <button className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                  Request Chat
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No mentors found matching your search.</p>
      )}
    </div>
  );
};

export default RecommendedMentors;
