// File: /src/hooks/useGame.js
import { useState, useEffect, useCallback } from 'react';
import { shuffleArray } from '../utils/arrayUtils';

export const useGame = (verbs, language, tense, isTranslationMode, isReverseTranslation, theme, onGameComplete) => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showSparkles, setShowSparkles] = useState(false);
  const [enterState, setEnterState] = useState(true);

  const generateQuestions = () => {
    return shuffleArray(
      verbs
        .filter(v => v.language === language)
        .map(v => {
          if (isTranslationMode) {
            return {
              verb: v.verb,
              translation: v.translation.toLowerCase(),
              verbTranslation: v.translation,
              pronoun: ''
            };
          } else {
            return Object.entries(v.forms[tense] || {}).map(([key, { pronoun, form }]) => ({
              pronoun,
              answer: form,
              verb: v.verb,
              verbTranslation: v.translation
            }));
          }
        })
        .flat()
    ).slice(0, 10);
  };

  const saveScore = () => {
    if (currentIndex === questions.length && questions.length > 0) {
      try {
        // Get existing scores from localStorage
        const storedScores = localStorage.getItem('glossolaliaScores');
        const scoreHistory = storedScores ? JSON.parse(storedScores) : [];
        
        // Create a new score entry
        const newScoreEntry = {
          date: new Date().toISOString(),
          score: score,
          total: questions.length,
          language,
          tense,
          mode: isTranslationMode 
            ? (isReverseTranslation ? 'translationReverse' : 'translation') 
            : 'conjugation'
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
    setQuestions(generateQuestions()); // Generate fresh set of questions
    setCurrentIndex(0); 
    setAnswer('');
    setFeedback('');
    setScore(0);
  };

  const handleShowAnswer = () => {
    const currentQuestion = questions[currentIndex];
    const correctAnswerText = isTranslationMode 
      ? (isReverseTranslation ? currentQuestion.verb : currentQuestion.translation)
      : currentQuestion.answer;
  
    const revealMessage = isTranslationMode
      ? `${theme.revealMessageTranslation} "${correctAnswerText}"`
      : `${theme.revealMessageInflectional} "${correctAnswerText}"`;
  
    setFeedback(revealMessage);
    
    setTimeout(() => {
      setFeedback('');
      setAnswer('');
      setCurrentIndex(currentIndex + 1);
      setEnterState(true);
    }, 4000);
  };

  const handleSubmit = () => {
    const currentQuestion = questions[currentIndex];
    const userAnswer = answer.trim().toLowerCase();
    
    let correctAnswer;
    if (isTranslationMode) {
      correctAnswer = isReverseTranslation ? 
        currentQuestion.verb.toLowerCase() : 
        currentQuestion.translation.toLowerCase();
    } else {
      correctAnswer = currentQuestion.answer.toLowerCase();
    };

    const isCorrect = isTranslationMode 
      ? correctAnswer.split(',').some(ans => 
          userAnswer.replace(/^to\s+/, '').replace(/\s*\([^)]*\)/g, '') === 
          ans.trim().replace(/^to\s+/, '').replace(/\s*\([^)]*\)/g, '')
        )
      : userAnswer === correctAnswer;

      if (isCorrect) {
        setScore(score + 1);
        let feedbackMessage = 'Correct!';
        let timeoutTime = 1000;
        
        if (isTranslationMode) {
          const allAnswers = correctAnswer.split(',').map(ans => ans.trim().replace(/^to\s+/, '').replace(/\s*\([^)]*\)/g, ''));
          const otherAnswers = allAnswers.filter(ans => ans !== userAnswer.replace(/^to\s+/, '').replace(/\s*\([^)]*\)/g, ''));
          
          if (otherAnswers.length > 0) {
            feedbackMessage = `Correct! This verb can also be translated as: '${otherAnswers.join(', ')}'`;
            timeoutTime = 3000;
          }
        }
        
        setFeedback(feedbackMessage);
        setShowSparkles(true);
    
        setTimeout(() => {
          setShowSparkles(false);
          setFeedback('');
          setAnswer('');
          setCurrentIndex(currentIndex + 1);
          setEnterState(true);
        }, timeoutTime);  // Increased time for users to read feedback
      } else {
        // When answer is incorrect, show appropriate error message
        const correctAnswerText = isTranslationMode 
            ? (isReverseTranslation ? currentQuestion.verb : currentQuestion.translation)
            : currentQuestion.answer;
            
        setFeedback(`Sorry, the correct answer is "${correctAnswerText}"`);
    
        setTimeout(() => {
            setFeedback('');
            setAnswer('');
            setCurrentIndex(currentIndex + 1);
            setEnterState(true);
        }, 3000);
    }
  };

  useEffect(() => {
    setQuestions(generateQuestions());
    setCurrentIndex(0);
    setAnswer('');
    setFeedback('');
    setScore(0);
  }, [language, tense, isTranslationMode, isReverseTranslation]);
  
  return {
    questions,
    currentIndex,
    score,
    answer,
    feedback,
    showSparkles,
    enterState,
    saveScore,
    setAnswer,
    setCurrentIndex,
    setScore,
    setFeedback,
    setShowSparkles,
    setEnterState,
    handleSubmit,
    handleShowAnswer,
    generateQuestions,
    handleRestart,
  };
};