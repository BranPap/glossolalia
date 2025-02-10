import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, Typography, TextField, Button, LinearProgress, Box, MenuItem, Select, Tooltip } from '@mui/material';

const App = () => {
  const textFieldRef = useRef(null);

  const verbs = [
    {
      verb: "olla",
      language: "Finnish",
      translation: "to be",
      forms: {
        present: {
          "1sg": { pronoun: "Minä", form: "olen" },
          "2sg": { pronoun: "Sinä", form: "olet" },
          "3sg": { pronoun: "Hän", form: "on" }
        },
        past: {
          "1sg": { pronoun: "Minä", form: "olin" },
          "2sg": { pronoun: "Sinä", form: "olit" },
          "3sg": { pronoun: "Hän", form: "oli" }
        }
      }
    },
    {
      verb: "būti",
      language: "Lithuanian",
      translation: "to be",
      forms: {
        present: {
          "1sg": { pronoun: "Aš", form: "esu" },
          "2sg": { pronoun: "Tu", form: "esi" },
          "3sg": { pronoun: "Jis/Ji", form: "yra" }
        }
      }
    }
  ];

  const [language, setLanguage] = useState('Finnish');
  const [tense, setTense] = useState('present');
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);

  // Helper function to shuffle array
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

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
    const filteredQuestions = verbs
      .filter(v => v.language === language && v.forms[tense])
      .flatMap(v =>
        Object.entries(v.forms[tense]).map(([key, { pronoun, form }]) => ({
          pronoun,
          answer: form,
          verb: v.verb,
          verbTranslation: v.translation
        }))
      );

    // Shuffle the questions
    setQuestions(shuffleArray(filteredQuestions));
    setCurrentIndex(0);
    setAnswer('');
    setFeedback('');
    setScore(0);
  }, [language, tense]);

  useEffect(() => {
    if (textFieldRef.current) textFieldRef.current.focus();
  }, [currentIndex]);

  const handleSubmit = () => {
    if (answer.trim().toLowerCase() === questions[currentIndex].answer) {
      setScore(score + 1);
      setFeedback('Correct!');
      setTimeout(() => {
        setFeedback('');
        setAnswer('');
        setCurrentIndex(currentIndex + 1);
      }, 1000);
    } else {
      setFeedback(`Sorry, the correct answer is "${questions[currentIndex].answer}"`);
      setTimeout(() => {
        setFeedback('');
        setAnswer('');
        setCurrentIndex(currentIndex + 1);
      }, 3000);
    }
  };

  const handleRestart = () => {
    setQuestions(shuffleArray([...questions])); // Reshuffle on restart
    setCurrentIndex(0);
    setAnswer('');
    setFeedback('');
    setScore(0);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const progress = (currentIndex / questions.length) * 100;
  const availableTenses = Object.keys(
    verbs.find(v => v.language === language)?.forms || {}
  );
  const isGameComplete = currentIndex >= questions.length;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // Bold, modern gradient
        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
        padding: { xs: 2, sm: 4, md: 6 }
      }}
    >
      <Card
        elevation={12}
        sx={{
          width: '100%',
          maxWidth: '800px',
          borderRadius: 2,
          background: '#fafafa',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #6366f1, #818cf8)'
          }
        }}
      >
        <CardContent sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
          <Box sx={{ textAlign: 'left', mb: 6 }}>
            <Typography 
              variant="h2" 
              sx={{ 
                fontWeight: '700', 
                color: '#312e81',
                fontFamily: "'Space Grotesk', sans-serif",
                letterSpacing: '-0.02em',
                mb: 1
              }}
            >
              Glossolalia
            </Typography>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: '#4f46e5',
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 500
              }}
            >
              ⟢ speak in new tongues
            </Typography>
          </Box>

          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            mb: 4
          }}>
            <Select
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value)}
              sx={{ 
                minWidth: 150,
                color: '#312e81',
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: '#818cf8',
                  borderWidth: '2px'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#6366f1'
                }
              }}
            >
              <MenuItem value="Finnish">Finnish</MenuItem>
              <MenuItem value="Lithuanian">Lithuanian</MenuItem>
            </Select>

            <Select
              value={tense}
              onChange={(e) => setTense(e.target.value)}
              sx={{ 
                minWidth: 150,
                color: '#312e81',
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: '#818cf8',
                  borderWidth: '2px'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#6366f1'
                }
              }}
            >
              {availableTenses.map(t => (
                <MenuItem key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</MenuItem>
              ))}
            </Select>
          </Box>

          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ 
              height: 6, 
              borderRadius: 3, 
              mb: 4,
              backgroundColor: '#e0e7ff',
              '& .MuiLinearProgress-bar': {
                background: '#4f46e5'
              }
            }} 
          />

          <Box sx={{ 
            minHeight: 200, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'start', 
            justifyContent: 'center'
          }}>
            {questions.length === 0 ? (
              <Typography variant="h6" sx={{ color: '#312e81' }}>
                That combination isn't available yet.
              </Typography>
            ) : isGameComplete ? (
              <Box sx={{ width: '100%' }}>
                <Typography variant="h4" sx={{ mb: 2, color: '#312e81', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>
                  Set Complete
                </Typography>
                <Typography variant="h5" sx={{ mb: 3, color: '#4f46e5' }}>
                  {score} of {questions.length} correct
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleRestart}
                  sx={{
                    px: 4,
                    py: 1.5,
                    background: '#4f46e5',
                    '&:hover': { 
                      background: '#4338ca',
                    },
                    textTransform: 'none',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 500,
                    fontSize: '1.1rem',
                    borderRadius: 1.5
                  }}
                >
                  Another Set
                </Button>
              </Box>
            ) : (
              <>
                <Typography variant="h5" sx={{ 
                  mb: 3, 
                  color: '#312e81',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 500,
                  lineHeight: 1.6
                }}>
                  {questions[currentIndex].pronoun}{' '}
                  <span style={{ color: '#6366f1' }}>_</span>{' '}
                  <Tooltip title={`(${questions[currentIndex].verbTranslation})`} arrow>
                    <span style={{ cursor: 'pointer', color: '#4f46e5' }}>
                      ({questions[currentIndex].verb})
                    </span>
                  </Tooltip>
                </Typography>

                <TextField
                  fullWidth
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  onKeyDown={handleKeyDown}
                  inputRef={textFieldRef}
                  sx={{ 
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#818cf8',
                        borderWidth: '2px'
                      },
                      '&:hover fieldset': {
                        borderColor: '#6366f1'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#4f46e5'
                      }
                    }
                  }}
                />

                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{
                    px: 4,
                    py: 1.5,
                    background: '#4f46e5',
                    '&:hover': { 
                      background: '#4338ca',
                    },
                    textTransform: 'none',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 500,
                    fontSize: '1.1rem',
                    borderRadius: 1.5
                  }}
                >
                  Check
                </Button>
              </>
            )}
          </Box>

          {feedback && (
            <Typography 
              sx={{ 
                mt: 3, 
                color: feedback === 'Correct!' ? '#4f46e5' : '#dc2626',
                fontWeight: 500,
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1.1rem'
              }}
            >
              {feedback}
            </Typography>
          )}

          <Typography sx={{ 
            mt: 3, 
            color: '#4f46e5', 
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1rem',
            fontWeight: 500
          }}>
            Score: {score} / {questions.length}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default App;