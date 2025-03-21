
import React, { useState } from 'react';
import MessagesTab from '../components/tabs/MessagesTab';
import TechNewsTab from '../components/tabs/TechNewsTab';
import PracticeTab from '../components/tabs/PracticeTab';
import UploadCourseTab from '../components/tabs/UploadCourseTab';
import CourseSearchTab from '../components/tabs/CourseSearchTab';

const Dashboard = () => {
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const isMentor = user?.role === 'mentor';

  const [activeTab, setActiveTab] = useState('messages');

  const tabs = [
    { key: 'messages', label: 'Messages' },
    { key: 'news', label: 'Tech News' },
    { key: 'practice', label: 'Practice' },
    isMentor
      ? { key: 'upload', label: 'Upload Course' }
      : { key: 'search', label: 'Course Search' }
  ];

  return (
    <div className="container mx-auto px-4 py-4">
      <h2 className="text-2xl font-semibold mb-4">Welcome, {user?.username}</h2>

      {}
      <div className="flex space-x-2 mb-4">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`px-4 py-2 rounded transition-all duration-300
              ${activeTab === t.key ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}
            `}
          >
            {t.label}
          </button>
        ))}
      </div>

      {}
      <div className="relative overflow-hidden">
        {}
        <div
          className={`transition-all duration-300 ${
            activeTab === 'messages' ? 'block' : 'hidden'
          }`}
        >
          <MessagesTab />
        </div>

        {}
        <div
          className={`transition-all duration-300 ${
            activeTab === 'news' ? 'block' : 'hidden'
          }`}
        >
          <TechNewsTab />
        </div>

        {}
        <div
          className={`transition-all duration-300 ${
            activeTab === 'practice' ? 'block' : 'hidden'
          }`}
        >
          <PracticeTab />
        </div>

        {}
        {isMentor ? (
          <div
            className={`transition-all duration-300 ${
              activeTab === 'upload' ? 'block' : 'hidden'
            }`}
          >
            <UploadCourseTab />
          </div>
        ) : (
          <div
            className={`transition-all duration-300 ${
              activeTab === 'search' ? 'block' : 'hidden'
            }`}
          >
            <CourseSearchTab />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
