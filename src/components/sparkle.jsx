import React, { useEffect, useState } from 'react';
import './sparkle.css'; 

const themeEmojis = {
  modern: [''],
  forest: ['🍃', '🌱', '🌿', '🍂', '🌸'],
  witchy: ['✨', '🔮', '🪄', '🌙', '🧿'],
  cyberpunk: ['⚙️', '⚡', '👾', '🖤', '🌐'],
  ocean: ['🐚', '🌊', '🐙', '🐠', '🐳'],
  cosmic: ['🌟', '🚀', '🪐', '🛸', '👽'],
  horror: ['🩸', '💀', '🪦', '😰', '🦇']
};

const Sparkle = ({ theme }) => {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const emojis = themeEmojis[theme] || ['🌟'];
    const newSparkles = Array.from({ length: 8 }).map(() => ({
      id: Math.random(),
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      x: Math.random() * 100,
      y: Math.random() * 50,
      size: 16 + Math.random() * 32,
      duration: 1 + Math.random(),
    }));
    setSparkles(newSparkles);

    const timer = setTimeout(() => setSparkles([]), 2500);
    return () => clearTimeout(timer);
  }, [theme]);

  return (
    <div className="sparkle-container">
      {sparkles.map((sparkle) => (
        <span
          key={sparkle.id}
          className="sparkle"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            fontSize: `${sparkle.size}px`,
            animationDuration: `${sparkle.duration}s`,
          }}
        >
          {sparkle.emoji}
        </span>
      ))}
    </div>
  );
};


export default Sparkle;
