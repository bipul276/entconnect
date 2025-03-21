import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sparkle from '../Sparkle';

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const PracticeTab = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);

  useEffect(() => {
    axios
      .get('https://opentdb.com/api.php', {
        params: {
          amount: 10,
          type: 'multiple'
        }
      })
      .then((res) => {
        const processedQuestions = res.data.results.map((q) => {
          const allAnswers = [...q.incorrect_answers, q.correct_answer];
          return { ...q, answers: shuffleArray(allAnswers) };
        });
        setQuestions(processedQuestions);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleAnswerClick = (answer) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);
    const correct = questions[currentQuestionIndex].correct_answer;
    if (answer === correct) {
      setFeedback('Correct!');
      setScore((prev) => prev + 1);
      setShowSparkle(true);
    } else {
      setFeedback(`Incorrect! The correct answer is: ${correct}`);
    }
  };

  const handleNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex >= questions.length) {
      setShowScore(true);
    } else {
      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswer(null);
      setFeedback('');
    }
  };

  if (questions.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-xl text-gray-600">Loading questions...</p>
      </div>
    );
  }

  if (showScore) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
        <p className="text-xl mb-4">
          Your score: {score} out of {questions.length}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700 transition duration-300"
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="p-4">
      <div className="relative bg-white p-6 shadow-lg rounded-lg">
        {}
        {showSparkle && <Sparkle onComplete={() => setShowSparkle(false)} />}
        <div className="mb-4">
          <h2
            className="text-2xl font-semibold mb-2"
            dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
          ></h2>
          <p className="text-gray-600">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
        </div>
        <div className="space-y-4">
          {currentQuestion.answers.map((answer, idx) => {
            let btnClass = "w-full text-left border border-gray-300 rounded px-4 py-2 transition-colors duration-300 ";
            if (selectedAnswer) {
              if (answer === selectedAnswer) {
                btnClass += answer === currentQuestion.correct_answer ? 'bg-green-200' : 'bg-red-200';
              } else {
                btnClass += 'bg-white';
              }
            } else {
              btnClass += 'bg-white hover:bg-blue-50';
            }
            return (
              <button
                key={idx}
                onClick={() => handleAnswerClick(answer)}
                className={btnClass}
                dangerouslySetInnerHTML={{ __html: answer }}
              ></button>
            );
          })}
        </div>
        {feedback && (
          <div className="mt-4">
            <p className="font-semibold text-lg">{feedback}</p>
          </div>
        )}
        {selectedAnswer && (
          <div className="mt-6 text-right">
            <button
              onClick={handleNextQuestion}
              className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700 transition duration-300"
            >
              {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PracticeTab;
