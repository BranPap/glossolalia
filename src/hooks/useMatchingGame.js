// File: /src/hooks/useMatchingGame.js
import { useState, useEffect, useCallback } from 'react';
import { shuffleArray } from '../utils/arrayUtils';

export const useMatchingGame = (verbs, language, tense, theme, onGameComplete) => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [showSparkles, setShowSparkles] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [totalVerbs, setTotalVerbs] = useState(0); // Track total number of verb forms

  const generateQuestions = () => {
    // Get verbs for the selected language with the selected tense
    const filteredVerbs = verbs
      .filter(v => v.language === language && v.forms && v.forms[tense])
      .map(v => ({
        verb: v.verb,
        verbTranslation: v.translation,
        forms: v.forms[tense] // Use only the forms for the selected tense
      }));
    
    // Shuffle and take only 5 verbs maximum (or less if there aren't 5)
    const selectedVerbs = shuffleArray(filteredVerbs).slice(0, 5);
    
    // Calculate total verb forms for scoring
    let totalVerbForms = 0;
    selectedVerbs.forEach(q => {
      totalVerbForms += Object.keys(q.forms).length;
    });
    setTotalVerbs(totalVerbForms);
    
    return selectedVerbs;
  };

  const saveScore = () => {
    if (isCompleted && questions.length > 0) {
      try {
        // Get existing scores from localStorage
        const storedScores = localStorage.getItem('glossolaliaScores');
        const scoreHistory = storedScores ? JSON.parse(storedScores) : [];
        
        // Create a new score entry with a clearly labeled mode
        const newScoreEntry = {
          date: new Date().toISOString(),
          score: score,
          total: totalVerbs,
          language,
          tense,
          mode: 'matching' // This is the key used for display
        };
        
        // Add new score to history and save back to localStorage
        const updatedScores = [newScoreEntry, ...scoreHistory].slice(0, 50); // Keep last 50 scores
        localStorage.setItem('glossolaliaScores', JSON.stringify(updatedScores));
        
        // Call the callback to notify that a game was completed and score saved
        if (onGameComplete) {
          onGameComplete();
        }
      } catch (error) {
        console.error('Failed to save score:', error);
      }
    }
  };

  const handleRestart = () => {
    saveScore();
    const newQuestions = generateQuestions();
    setQuestions(newQuestions);
    setCurrentIndex(0); 
    setFeedback('');
    setScore(0);
    setIsCompleted(false);
  };

  const handleMatchingComplete = (correctCount, totalCount) => {
    // Update the score based on the matching results
    const newScore = score + correctCount;
    setScore(newScore);
    
    // Show sparkles for correct answers
    if (correctCount === totalCount) {
      setShowSparkles(true);
      setTimeout(() => {
        setShowSparkles(false);
      }, 2000);
    }
    
    // Move to the next question after a delay
    setTimeout(() => {
      if (currentIndex + 1 >= questions.length) {
        setIsCompleted(true);
        // We delay calling saveScore here to ensure state is updated
        setTimeout(() => saveScore(), 0);
      } else {
        setCurrentIndex(currentIndex + 1);
        setFeedback('');
      }
    }, 3000);
  };

  useEffect(() => {
    const newQuestions = generateQuestions();
    setQuestions(newQuestions);
    setCurrentIndex(0);
    setFeedback('');
    setScore(0);
    setIsCompleted(false);
  }, [language, tense]);
  
  return {
    questions,
    currentIndex,
    score,
    totalVerbs,
    feedback,
    showSparkles,
    isCompleted,
    saveScore,
    setFeedback,
    handleMatchingComplete,
    handleRestart,
  };
};