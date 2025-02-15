import { useState, useEffect } from 'react';
import { verbs, shuffleArray } from '../data/verbs';

export const useVerbQuiz = () => {
  const [language, setLanguage] = useState('Finnish');
  const [tense, setTense] = useState('present');
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [enterState, setEnterState] = useState(true);

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    const availableTenses = Object.keys(
      verbs.find(v => v.language === newLanguage)?.forms || {}
    );
    if (!availableTenses.includes(tense)) {
      setTense(availableTenses[0]);
    }
  };

  useEffect(() => {
    const filteredQuestions = shuffleArray(verbs
      .filter(v => v.language === language && v.forms[tense])
      .flatMap(v =>
        Object.entries(v.forms[tense]).map(([key, { pronoun, form }]) => ({
          pronoun,
          answer: form,
          verb: v.verb,
          verbTranslation: v.translation
        }))
      )
    ).slice(0, 10);

    setQuestions(shuffleArray(filteredQuestions));
    setCurrentIndex(0);
    setAnswer('');
    setFeedback('');
    setScore(0);
  }, [language, tense]);

  const handleSubmit = () => {
    if (answer.trim().toLowerCase() === questions[currentIndex].answer) {
      setScore(score + 1);
      setFeedback('Correct!');
      setEnterState(false);
      setTimeout(() => {
        setFeedback('');
        setAnswer('');
        setCurrentIndex(currentIndex + 1);
        setEnterState(true);
      }, 1000);
    } else {
      setFeedback(`Sorry, the correct answer is "${questions[currentIndex].answer}"`);
      setEnterState(false);
      setTimeout(() => {
        setFeedback('');
        setAnswer('');
        setCurrentIndex(currentIndex + 1);
        setEnterState(true);
      }, 3000);
    }
  };

  const handleRestart = () => {
    setQuestions(shuffleArray([...questions]));
    setCurrentIndex(0);
    setAnswer('');
    setFeedback('');
    setScore(0);
  };

  return {
    language,
    tense,
    questions,
    currentIndex,
    answer,
    feedback,
    score,
    enterState,
    setAnswer,
    handleLanguageChange,
    handleSubmit,
    handleRestart,
    progress: (currentIndex / questions.length) * 100,
    availableTenses: Object.keys(verbs.find(v => v.language === language)?.forms || {}),
    isGameComplete: currentIndex >= questions.length
  };
};