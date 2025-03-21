import React, { useState } from 'react';
import axios from 'axios';

const UploadCourseTab = () => {
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
      <h3 className="text-xl font-semibold">Upload Course</h3>
      <div>
        <label className="block text-gray-700">Title</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Description</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-gray-700">Content</label>
        <textarea
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Upload
      </button>
    </form>
  );
};

export default UploadCourseTab;
