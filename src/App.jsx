import React, { useState, useRef, useEffect } from 'react';
import { Box, Card, CardContent, Typography, LinearProgress, IconButton } from '@mui/material';
import { Info, Assessment, MenuBook } from '@mui/icons-material';
import HistoryIcon from '@mui/icons-material/History';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { themes } from './themes';
import { verbs } from './data/verbs';
import { useGame } from './hooks/useGame';
import GameControls from './components/gameControls'
import GameQuestion from './components/gameQuestion';
import ThemeSelector from './components/ThemeSelector';
import InfoDialog from './components/InfoDialog';
import Sparkle from './components/Sparkle';
import StatsDialog from './components/stats';
import ScoreHistory from './components/ScoreHistory';
import DictionaryDialog from './components/DictionaryDialog';
import './components/HistoryPulse.css';

const App = () => {
  // Theme and UI states
  const [statsOpen, setStatsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('modern');
  const [language, setLanguage] = useState('Spanish');
  const [tense, setTense] = useState('present');
  const [isTranslationMode, setIsTranslationMode] = useState(false);
  const [isReverseTranslation, setIsReverseTranslation] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [scoreHistoryOpen, setScoreHistoryOpen] = useState(false);
  const [dictionaryOpen, setDictionaryOpen] = useState(false);
  const [showHistoryPulse, setShowHistoryPulse] = useState(false);
  
  
  const textFieldRef = useRef(null);

  const handleGameComplete = () => {
    setShowHistoryPulse(true);
    setTimeout(() => {
      setShowHistoryPulse(false);
    }, 4000); // 3 pulses of 1s each + some extra time
  };
  

  // Get game state and handlers from custom hook
  const {
    questions,
    currentIndex,
    score,
    answer,
    feedback,
    showSparkles,
    enterState,
    saveScore,
    setAnswer,
    handleSubmit,
    handleShowAnswer,
    handleRestart
  } = useGame(
    verbs, 
    language, 
    tense, 
    isTranslationMode, 
    isReverseTranslation, 
    themes[currentTheme],
    handleGameComplete  // New callback parameter
  );

  // Calculate derived values
  const progress = (currentIndex / questions.length) * 100;
  const availableTenses = Object.keys(
    verbs.find(v => v.language === language)?.forms || {}
  );
  const isGameComplete = currentIndex >= questions.length;

  // Check for touch device on mount
  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouchDevice();
  }, []);

  // Handle language change
  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    const availableTenses = Object.keys(
      verbs.find(v => v.language === newLanguage)?.forms || {}
    );
    if (!availableTenses.includes(tense)) {
      setTense(availableTenses[0]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !isGameComplete) {
      e.preventDefault();
      handleSubmit();
    }
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
      <Box sx={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 1 }}>
      <IconButton 
        onClick={() => setScoreHistoryOpen(true)}
        sx={{ color: themes[currentTheme].secondary }}
        className={showHistoryPulse ? 'history-icon-pulse' : ''}
      >
        <HistoryIcon />
      </IconButton>
        <IconButton
          onClick={() => setDictionaryOpen(true)}
          sx={{ color: themes[currentTheme].secondary }}
        >
          <MenuBook />
        </IconButton>
        <IconButton
          onClick={() => setStatsOpen(true)}
          sx={{ color: themes[currentTheme].secondary}}
        >
          <Assessment />
        </IconButton>
        <IconButton 
          onClick={() => setInfoOpen(true)}
          sx={{ color: themes[currentTheme].secondary }}
        >
          <Info />
        </IconButton>
      </Box>

      <InfoDialog 
        open={infoOpen} 
        onClose={() => setInfoOpen(false)} 
        theme={themes[currentTheme]}
      />

      <DictionaryDialog
        open={dictionaryOpen}
        onClose={() => setDictionaryOpen(false)}
        verbs={verbs}
        theme={themes[currentTheme]}
      />

      <ScoreHistory 
        open={scoreHistoryOpen} 
        onClose={() => setScoreHistoryOpen(false)} 
        theme={themes[currentTheme]}
      />

      <StatsDialog 
        open={statsOpen} 
        onClose={() => setStatsOpen(false)} 
        verbs={verbs}
        theme={themes[currentTheme]}
        currentTheme={currentTheme}
      />

      <ThemeSelector 
        themes={themes}
        currentTheme={currentTheme}
        setCurrentTheme={setCurrentTheme}
      />

      <Card
        elevation={12}
        sx={{
          width: '100%',
          maxWidth: '800px',
          borderRadius: 2,
          background: currentTheme === 'cyberpunk' ? '#000000' : '#fafafa',
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
          {/* Header */}
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

          {/* Game Controls */}
          <GameControls 
            isTranslationMode={isTranslationMode}
            setIsTranslationMode={setIsTranslationMode}
            language={language}
            tense={tense}
            handleLanguageChange={handleLanguageChange}
            setTense={setTense}
            availableTenses={availableTenses}
            isReverseTranslation={isReverseTranslation}
            setIsReverseTranslation={setIsReverseTranslation}
            theme={themes[currentTheme]}
          />

          {/* Progress Bar */}
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

          {/* Game Content */}
          <Box sx={{ 
            minHeight: 200, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'start', 
            justifyContent: 'center',
            position: 'relative'
          }}>
            {showSparkles && <Sparkle theme={currentTheme} />}

            {questions.length === 0 ? (
              <Typography variant="h6" sx={{ color: themes[currentTheme].secondary }}>
                That combination isn't available yet.
              </Typography>
            ) : isGameComplete ? (
              <Box sx={{ width: '100%', textAlign: 'center' }}>
                <Typography variant="h4" sx={{ 
                  mb: 2, 
                  color: themes[currentTheme].secondary, 
                  fontFamily: "'Space Grotesk', sans-serif", 
                  fontWeight: 700,
                  fontStyle: currentTheme === 'witchy' ? 'italic' : 'normal'
                }}>
                  {score === 10 ? themes[currentTheme].perfectEvalMessage :
                  score > 5 ? themes[currentTheme].goodEvalMessage :
                  score > 0 ? themes[currentTheme].okayEvalMessage :
                  themes[currentTheme].failEvalMessage} {themes[currentTheme].completeEmoji}
                </Typography>
                <Typography variant="h5" sx={{ 
                  mb: 3, 
                  color: themes[currentTheme].primary,
                  fontStyle: currentTheme === 'witchy' ? 'italic' : 'normal'
                }}>
                  {score} of {questions.length} correct
                </Typography>
                <button
                  onClick={handleRestart}
                  style={{
                    padding: '12px 24px',
                    background: themes[currentTheme].primary,
                    color: 'white',
                    border: 'none',
                    borderRadius: themes[currentTheme].buttonRadius,
                    cursor: 'pointer',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 500,
                    fontSize: '1.1rem'
                  }}
                >
                  {themes[currentTheme].restartButtonText}
                </button>
              </Box>
            ) : (
              <GameQuestion 
                currentQuestion={questions[currentIndex]}
                answer={answer}
                setAnswer={setAnswer}
                handleSubmit={handleSubmit}
                handleKeyDown={handleKeyDown}
                handleShowAnswer={handleShowAnswer}
                textFieldRef={textFieldRef}
                isTouchDevice={isTouchDevice}
                theme={themes[currentTheme]}
                isTranslationMode={isTranslationMode}
                isReverseTranslation={isReverseTranslation}
              />
            )}
          </Box>

          {/* Feedback */}
          {feedback && (
            <Typography 
              sx={{ 
                mt: 3, 
                color: feedback.includes('Correct!') ? 
                  themes[currentTheme].correct : 
                  themes[currentTheme].incorrect,
                fontWeight: 500,
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1.5rem',
                fontStyle: currentTheme === 'witchy' ? 'italic' : 'normal'
              }}
            >
              {feedback}
            </Typography>
          )}

          {/* Score */}
          <Typography sx={{ 
            mt: 3, 
            color: themes[currentTheme].primary, 
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