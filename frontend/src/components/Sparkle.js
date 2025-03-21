import React, { useEffect, useState } from 'react';

const Sparkle = ({ count = 10, onComplete }) => {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const newSparkles = [];
    for (let i = 0; i < count; i++) {
      newSparkles.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 10 + 10,
        delay: Math.random() * 0.3
      });
    }
    setSparkles(newSparkles);
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 1000);
    return () => clearTimeout(timer);
  }, [count, onComplete]);

  return (
    <div className="sparkle-container">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="sparkle-realistic"
          style={{
            left: `${sparkle.left}%`,
            top: `${sparkle.top}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            animationDelay: `${sparkle.delay}s`
          }}
        />
      ))}
    </div>
  );
};

export default Sparkle;
