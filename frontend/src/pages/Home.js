import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ScrollableNews from './ScrollableNews';
import Practice from './Practice';

const Home = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/news')
      .then((res) => setNews(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {}
      <header className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
            Welcome to VentureBridge
          </h1>
          <p className="text-xl mb-8 drop-shadow-sm">
            Connect, learn, and grow together with industry insights and interactive challenges.
          </p>

        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b pb-2">
            Tech News & Trends
          </h2>
          <ScrollableNews news={news} />
        </section>

        {}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b pb-2">
            Practice Questions
          </h2>
          <Practice />
        </section>
      </div>

      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Entrepreneur Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
