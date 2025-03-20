import React from 'react';
import LoginPrompt from '../components/LoginPrompt';

const Home = () => {
  return (
    <div>
      {/* Hero section */}
      <header className="bg-gray-200 py-16 text-center">
        <h1 className="text-4xl font-bold mb-2">Welcome to Entrepreneur Platform</h1>
        <p className="text-lg text-gray-600">Connect, learn, and grow together.</p>
      </header>

      <div className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Tech News & Trends</h2>
          <p>Stay updated with the latest in tech.</p>
          {/* Potential News component or link to /news */}
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Practice Questions</h2>
          <p>Challenge yourself and grow your skills.</p>
          {/* Potential Practice component or link to /practice */}
        </section>
      </div>

      <LoginPrompt />
    </div>
  );
};

export default Home;
