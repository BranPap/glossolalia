import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, Typography, TextField, Button, LinearProgress, Box, MenuItem, Select, Tooltip } from '@mui/material';
import { verbs, shuffleArray } from './data/verbs';
import { IconButton } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { themes } from './themes';
import Sparkle from './components/sparkle';

const App = () => {
  const textFieldRef = useRef(null);

  const [currentTheme, setCurrentTheme] = useState('modern');
  const [language, setLanguage] = useState('Finnish');
  const [tense, setTense] = useState('present');
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [enterState, setEnterState] = useState(true);
  const [showSparkles, setShowSparkles] = useState(false);

  // Calculate these values before they're used in the render
  const progress = (currentIndex / questions.length) * 100;
  const availableTenses = Object.keys(
    verbs.find(v => v.language === language)?.forms || {}
  );
  const isGameComplete = currentIndex >= questions.length;

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
    ).slice(0,10);
  
    // Shuffle the questions
    setQuestions(shuffleArray(filteredQuestions));
    setCurrentIndex(0);
    setAnswer('');
    setFeedback('');
    setScore(0);
  }, [language, tense]);

  // Update handleSubmit to include sparkle effect
  const handleSubmit = () => {
    if (answer.trim().toLowerCase() === questions[currentIndex].answer) {
      setScore(score + 1);
      setFeedback('Correct!');
      setEnterState(false);
      setShowSparkles(true);
      setTimeout(() => setShowSparkles(false), 2000);
      setTimeout(() => {
        setFeedback('');
        setAnswer('');
        setCurrentIndex(currentIndex + 1);
        setEnterState(true);
      }, 2000);
    } else {
      setFeedback(`Sorry, the correct answer is "${questions[currentIndex].answer}"`);
      setEnterState(false)
      setTimeout(() => {
        setFeedback('');
        setAnswer('');
        setCurrentIndex(currentIndex + 1);
        setEnterState(true)
      }, 3000);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && enterState === true) {
      e.preventDefault();
      handleSubmit();
    }
  };
  
  const handleRestart = () => {
    setQuestions(shuffleArray([...questions])); // Reshuffle on restart
    setCurrentIndex(0);
    setAnswer('');
    setFeedback('');
    setScore(0);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: themes[currentTheme].background,
        padding: { xs: 2, sm: 4, md: 6 },
        transition: 'all 0.3s ease',
        cursor: themes[currentTheme].cursor
      }}
    >
  <Card
  elevation={8}
  sx={{
    position: 'fixed',
    // On mobile: bottom of screen, horizontal
    // On desktop: left side, vertical
    bottom: { xs: '16px', md: 'auto' },
    left: { xs: '50%', md: '24px' },
    top: { xs: 'auto', md: '50%' },
    transform: { 
      xs: 'translateX(-50%)', 
      md: 'translateY(-50%)' 
    },
    borderRadius: 4,
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(8px)',
    p: 1,
    display: 'flex',
    // Row on mobile, column on desktop
    flexDirection: { xs: 'row', md: 'column' },
    gap: 1,
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: 16
    },
    // Make sure it stays above other content
    zIndex: 1000
  }}
>
  {Object.entries(themes).map(([themeName, theme]) => (
    <IconButton
      key={themeName}
      onClick={() => setCurrentTheme(themeName)}
      sx={{
        p: { xs: 1, md: 1.5 },
        fontSize: { xs: '1.25rem', md: '1.5rem' },
        backgroundColor: currentTheme === themeName ? 
          `${themes[currentTheme].accent}20` : 'transparent',
        '&:hover': {
          backgroundColor: `${themes[themeName].accent}20`
        }
      }}
    >
      {theme.themeIcon}
    </IconButton>
  ))}
</Card>
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
            background: themes[currentTheme].cardBorder,
            transition: 'background 0.3s ease'
          }
        }}
      >
        <CardContent sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
          <Box sx={{ textAlign: 'left', mb: 6 }}>
            <Typography 
              variant="h2" 
              sx={{ 
                fontWeight: '700', 
                color: themes[currentTheme].secondary,
                fontFamily: "'Space Grotesk', sans-serif",
                letterSpacing: '-0.02em',
                mb: 1,
                fontStyle: currentTheme === 'witchy' ? 'italic' : 'normal'
              }}
            >
              Glossolalia
            </Typography>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: themes[currentTheme].primary,
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 500,
                fontStyle: currentTheme === 'witchy' ? 'italic' : 'normal'
              }}
            >
              {themes[currentTheme].subtitle}
            </Typography>
          </Box>

          {/* Language/Tense Selection Box remains mostly the same but with updated colors */}
          <Box sx={{ 
            display: 'flex', 
            gap: 4,  // Increased gap to accommodate labels
            mb: 4,
            alignItems: 'flex-end'
          }}>
            <Box>
              <Typography sx={{ mb: 1, color: themes[currentTheme].secondary, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>
                Language
              </Typography>
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
            </Box>
          
            <Box>
            <Typography sx={{ mb: 1, color: themes[currentTheme].secondary, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>
                Tense
              </Typography>
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
          </Box>

          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ 
              height: 6, 
              borderRadius: 3, 
              mb: 4,
              backgroundColor: themes[currentTheme].progressBg,
              '& .MuiLinearProgress-bar': {
                background: themes[currentTheme].progressBar
              }
            }} 
          />

          <Box sx={{ 
            minHeight: 200, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'start', 
            justifyContent: 'center',
            position: 'relative'
          }}>
            {showSparkles && <Sparkle theme={currentTheme} style={{ zIndex: 1000 }} />}

            
            {questions.length === 0 ? (
              <Typography variant="h6" sx={{ color: themes[currentTheme].secondary }}>
                That combination isn't available yet.
              </Typography>
            ) : isGameComplete ? (
              <Box sx={{ width: '100%' }}>
                <Typography variant="h4" sx={{ 
                  mb: 2, 
                  color: themes[currentTheme].secondary, 
                  fontFamily: "'Space Grotesk', sans-serif", 
                  fontWeight: 700,
                  fontStyle: currentTheme === 'witchy' ? 'italic' : 'normal'
                }}>
                  {themes[currentTheme].completeMessage} {themes[currentTheme].completeEmoji}
                </Typography>
                <Typography variant="h5" sx={{ 
                  mb: 3, 
                  color: themes[currentTheme].primary,
                  fontStyle: currentTheme === 'witchy' ? 'italic' : 'normal'
                }}>
                  {score} of {questions.length} correct
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleRestart}
                  sx={{
                    px: 4,
                    py: 1.5,
                    background: themes[currentTheme].primary,
                    borderRadius: themes[currentTheme].buttonRadius,
                    '&:hover': { 
                      background: themes[currentTheme].accentHover,
                    },
                    textTransform: 'none',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 500,
                    fontSize: '1.1rem'
                  }}
                >
                  {themes[currentTheme].restartButtonText}
                </Button>
              </Box>
            ) : (
              <>
                <Typography variant="h5" sx={{ 
                  mb: 3, 
                  color: themes[currentTheme].secondary,
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 500,
                  lineHeight: 1.6,
                  fontStyle: currentTheme === 'witchy' ? 'italic' : 'normal'
                }}>
                  {questions[currentIndex].pronoun}{' '}
                  <span style={{ color: themes[currentTheme].accent }}>_</span>{' '}
                  <Tooltip title={`(${questions[currentIndex].verbTranslation})`} arrow>
                    <span style={{ cursor: 'pointer', color: themes[currentTheme].primary }}>
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
                        borderColor: themes[currentTheme].accent,
                        borderWidth: '2px',
                        borderRadius: themes[currentTheme].buttonRadius
                      },
                      '&:hover fieldset': {
                        borderColor: themes[currentTheme].accentHover
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: themes[currentTheme].primary
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
                    background: themes[currentTheme].primary,
                    borderRadius: themes[currentTheme].buttonRadius,
                    '&:hover': { 
                      background: themes[currentTheme].accentHover,
                    },
                    textTransform: 'none',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 500,
                    fontSize: '1.1rem'
                  }}
                >
                  {themes[currentTheme].checkButtonText}
                </Button>
              </>
            )}
          </Box>

          {feedback && (
            <Typography 
              sx={{ 
                mt: 3, 
                color: feedback === 'Correct!' ? themes[currentTheme].correct : themes[currentTheme].incorrect,
                fontWeight: 500,
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1.5rem',
                fontStyle: currentTheme === 'witchy' ? 'italic' : 'normal'
              }}
            >
              {feedback}
            </Typography>
          )}

          <Typography sx={{ 
            mt: 3, 
            color: themes[currentTheme].primary, 
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1rem',
            fontWeight: 500,
            fontStyle: currentTheme === 'witchy' ? 'italic' : 'normal'
          }}>
            Score: {score} / {questions.length}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default App;