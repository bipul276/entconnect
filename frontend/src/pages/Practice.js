import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Practice = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/questions')
      .then(res => setQuestions(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Practice Questions</h2>
      <div className="space-y-4">
        {questions.map(q => (
          <div key={q._id} className="border border-gray-200 rounded p-4">
            <h4 className="font-semibold">{q.questionText}</h4>
            {q.options && q.options.map((opt, idx) => (
              <p key={idx} className="text-gray-700 ml-4">- {opt}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Practice;
