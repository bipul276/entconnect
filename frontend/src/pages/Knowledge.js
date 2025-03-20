import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Knowledge = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/knowledge')
      .then(res => setArticles(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="section container knowledge">
      <h2 className="section-title">Knowledge Base</h2>
      <div className="knowledge-list">
        {articles.map(article => (
          <div key={article._id} className="knowledge-card">
            <h3>{article.title}</h3>
            <p>{article.content.substring(0, 150)}...</p>
            <p><em>{new Date(article.date).toLocaleDateString()}</em></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Knowledge;
