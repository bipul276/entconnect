import React, { useState } from 'react';
import axios from 'axios';

const CourseUpload = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/courses',
        { title, description, content },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      alert('Course uploaded successfully');
      setTitle('');
      setDescription('');
      setContent('');
    } catch (err) {
      console.error(err);
      alert('Course upload failed');
    }
  };

  return (
    <form onSubmit={handleUpload} className="space-y-4">
      <div>
        <label className="block text-gray-700">Course Title</label>
        <input
          type="text"
          placeholder="Enter course title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Description</label>
        <input
          type="text"
          placeholder="Enter course description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-gray-700">Content</label>
        <textarea
          placeholder="Enter course content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        ></textarea>
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Upload Course
      </button>
    </form>
  );
};

export default CourseUpload;
