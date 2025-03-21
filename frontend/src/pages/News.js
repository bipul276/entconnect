import React, { useEffect, useState } from 'react';
import axios from 'axios';

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/news')
      .then((res) => setNews(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Tech News & Trends</h2>
      <ul className="list-disc list-inside space-y-2">
        {news.map((article, index) => (
          <li key={index}>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {article.title}
            </a>
            {article.description && (
              <p className="text-sm text-gray-500">{article.description}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default News;
