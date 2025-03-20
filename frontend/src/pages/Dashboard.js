import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [news, setNews] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [courses, setCourses] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    axios.get('http://localhost:5000/api/news')
      .then(res => setNews(res.data))
      .catch(err => console.error(err));
    axios.get('http://localhost:5000/api/questions')
      .then(res => setQuestions(res.data))
      .catch(err => console.error(err));
    axios.get('http://localhost:5000/api/courses')
      .then(res => setCourses(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Welcome, {user.username}</h2>

      {user.role === 'mentor' ? (
        <div className="mb-8">
          <h3 className="text-xl font-medium mb-2">Your Courses</h3>
          <ul className="space-y-2">
            {courses.filter(course => course.mentor._id === user._id).map(course => (
              <li key={course._id} className="p-3 border border-gray-200 rounded">
                {course.title}
              </li>
            ))}
          </ul>
          <h3 className="text-xl font-medium mt-6 mb-2">Upload a New Course</h3>
          <CourseUpload />
        </div>
      ) : (
        <div className="mb-8">
          <h3 className="text-xl font-medium mb-2">Recommended Mentors</h3>
          <MentorsList />
        </div>
      )}

      <section className="mb-8">
        <h3 className="text-xl font-medium mb-2">Tech News & Trends</h3>
        <ul className="list-disc list-inside">
          {news.map(item => (
            <li key={item._id}>
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-medium mb-2">Practice Questions</h3>
        <ul className="list-disc list-inside">
          {questions.map(q => (
            <li key={q._id}>{q.questionText}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

const CourseUpload = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/courses', { title, description, content }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Course uploaded');
      setTitle('');
      setDescription('');
      setContent('');
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    }
  };

  return (
    <form onSubmit={handleUpload} className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Course Title"
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={title}
          onChange={(e)=> setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Description"
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={description}
          onChange={(e)=> setDescription(e.target.value)}
        />
      </div>
      <div>
        <textarea
          placeholder="Content"
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={content}
          onChange={(e)=> setContent(e.target.value)}
        />
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Upload
      </button>
    </form>
  );
};

const MentorsList = () => {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/users', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => {
        const mentorsData = res.data.filter(u => u.role === 'mentor');
        setMentors(mentorsData);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <ul className="space-y-2">
      {mentors.map(m => (
        <li key={m._id} className="p-3 border border-gray-200 rounded flex justify-between items-center">
          <span>{m.username}</span>
          <button
            onClick={() => sendChatRequest(m._id)}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            Request Chat
          </button>
        </li>
      ))}
    </ul>
  );
};

const sendChatRequest = async (mentorId) => {
  const openingMessage = prompt('Enter your opening message:');
  if (!openingMessage) return;
  try {
    await axios.post('http://localhost:5000/api/chats/request', {
      receiverId: mentorId,
      openingMessage
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    alert('Chat request sent');
  } catch (err) {
    console.error(err);
    alert('Request failed');
  }
};

export default Dashboard;
