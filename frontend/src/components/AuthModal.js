import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import MentorCoursesModal from './MentorCoursesModal';

const AuthModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('student');
  const history = useHistory();
  const [showMentorCourses, setShowMentorCourses] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data));
      onClose();
      history.push('/dashboard');
      window.location.reload();
    } catch (err) {
      alert('Login failed');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password,
        role,
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data));
      if (role === 'mentor') {
        setShowMentorCourses(true);
      } else {
        onClose();
        history.push('/dashboard');
        window.location.reload();
      }
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/3 p-6 relative">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={onClose}
          >
            &times;
          </button>
          <div className="mb-4 flex justify-center space-x-4">
            <button
              onClick={() => setActiveTab('login')}
              className={`px-4 py-2 ${activeTab === 'login' ? 'border-b-2 border-blue-600 font-semibold' : 'text-gray-500'}`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`px-4 py-2 ${activeTab === 'register' ? 'border-b-2 border-blue-600 font-semibold' : 'text-gray-500'}`}
            >
              Register
            </button>
          </div>
          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white px-3 py-2 rounded">
                Login
              </button>
            </form>
          )}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Username</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Role</label>
                <select
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="student">Student</option>
                  <option value="mentor">Mentor</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white px-3 py-2 rounded">
                Register
              </button>
            </form>
          )}
        </div>
      </div>
      {showMentorCourses && (
        <MentorCoursesModal
          token={localStorage.getItem('token')}
          onComplete={() => {
            setShowMentorCourses(false);
            onClose();
            history.push('/dashboard');
            window.location.reload();
          }}
        />
      )}
    </>
  );
};

export default AuthModal;
