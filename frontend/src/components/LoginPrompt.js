import React from 'react';
import { Link } from 'react-router-dom';

const LoginPrompt = () => {
  return (
    <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded shadow">
      <Link to="/login" className="font-semibold hover:underline">
        Login to access all features
      </Link>
    </div>
  );
};

export default LoginPrompt;
