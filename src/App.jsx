import React, { useState } from 'react';

function App() {
  const conjugations = [
    { 
      pronoun: 'aš', 
      infinitive: 'skristi',
      correctAnswer: 'skrendu',
      tense: 'present',
      translation: 'to fly'
    },
    { 
      pronoun: 'tu', 
      infinitive: 'skristi',
      correctAnswer: 'skrendi',
      tense: 'present',
      translation: 'to fly'
    },
    { 
      pronoun: 'jis/ji', 
      infinitive: 'skristi',
      correctAnswer: 'skrenda',
      tense: 'present',
      translation: 'to fly'
    },
    { 
      pronoun: 'aš', 
      infinitive: 'eiti',
      correctAnswer: 'einu',
      tense: 'present',
      translation: 'to go'
    },
    { 
      pronoun: 'tu', 
      infinitive: 'eiti',
      correctAnswer: 'eini',
      tense: 'present',
      translation: 'to go'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);

  const checkAnswer = () => {
    const isCorrect = userInput.toLowerCase().trim() === currentConjugations[currentIndex].correctAnswer;
    setAttempts(attempts + 1);
    if (isCorrect) {
      setScore(score + 1);
    }
    setShowAnswer(true);
  };

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const [currentConjugations, setCurrentConjugations] = useState(shuffleArray(conjugations));

  const resetPractice = () => {
    setCurrentConjugations(shuffleArray(conjugations));
    setCurrentIndex(0);
    setScore(0);
    setAttempts(0);
    setUserInput('');
    setShowAnswer(false);
  };

  const nextQuestion = () => {
    if (currentIndex === currentConjugations.length - 1) {
      setShowAnswer(false);
      setUserInput('');
      return;
    }
    setCurrentIndex(currentIndex + 1);
    setUserInput('');
    setShowAnswer(false);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>Lithuanian Verb Practice</h1>
      
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <span>Score: {score}/{attempts}</span>
        <br />
        <span>Progress: {currentIndex + 1}/{currentConjugations.length}</span>
      </div>

      <div style={{ 
        border: '1px solid #ccc', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px' 
      }}>
        <h2 style={{ textAlign: 'center' }}>
          {currentConjugations[currentIndex].pronoun} _____ 
          <span 
            style={{ 
              color: '#666',
              position: 'relative',
              cursor: 'help',
              display: 'inline-block'
            }}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            ({currentConjugations[currentIndex].infinitive})
            {showTooltip && (
              <div style={{
                position: 'absolute',
                bottom: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#333',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '14px',
                whiteSpace: 'nowrap',
                zIndex: 1000,
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                marginBottom: '8px'
              }}>
                {currentConjugations[currentIndex].translation}
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 0,
                  height: 0,
                  borderLeft: '6px solid transparent',
                  borderRight: '6px solid transparent',
                  borderTop: '6px solid #333'
                }} />
              </div>
            )}
          </span>
        </h2>
        
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            style={{ 
              padding: '8px', 
              fontSize: '16px',
              marginRight: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !showAnswer) {
                checkAnswer();
              }
            }}
          />
          
          {!showAnswer ? (
            <button 
              onClick={checkAnswer}
              style={{ 
                padding: '8px 16px',
                fontSize: '16px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Check
            </button>
          ) : (
            <div style={{ marginTop: '20px' }}>
              <p style={{ 
                color: userInput.toLowerCase().trim() === currentConjugations[currentIndex].correctAnswer 
                  ? '#4CAF50' 
                  : '#f44336' 
              }}>
                {userInput.toLowerCase().trim() === currentConjugations[currentIndex].correctAnswer 
                  ? 'Correct!' 
                  : `Incorrect. The correct answer is: ${currentConjugations[currentIndex].correctAnswer}`}
              </p>
              {currentIndex === currentConjugations.length - 1 ? (
                <div>
                  <p>You've completed all the sentences!</p>
                  <button
                    onClick={resetPractice}
                    style={{
                      padding: '8px 16px',
                      fontSize: '16px',
                      backgroundColor: '#9C27B0',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      marginTop: '10px'
                    }}
                  >
                    Start New Round
                  </button>
                </div>
              ) : (
                <button 
                  onClick={nextQuestion}
                  style={{ 
                    padding: '8px 16px',
                    fontSize: '16px',
                    backgroundColor: '#2196F3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Next
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;