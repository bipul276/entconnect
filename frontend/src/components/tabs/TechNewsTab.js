import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TechNewsTab = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/news')
      .then((res) => setNews(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!news || news.length === 0) {
    return <p>No news found.</p>;
  }

  return (
    <div className="overflow-x-auto flex space-x-4 py-4">
      {news.map((article, idx) => (
        <div
          key={idx}
          className="min-w-[250px] bg-white border border-gray-300 p-4 rounded shadow"
        >
          {article.urlToImage && (
            <img
              src={article.urlToImage}
              alt={article.title}
              className="mb-2 w-full h-40 object-cover rounded"
            />
          )}
          <h3 className="font-semibold mb-1">{article.title}</h3>
          {article.description && (
            <p className="text-sm text-gray-700 mb-2">{article.description}</p>
          )}
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-sm"
          >
            Read more
          </a>
        </div>
      ))}
    </div>
  );
};

export default TechNewsTab;
