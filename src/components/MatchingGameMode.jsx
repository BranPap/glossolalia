import React from 'react';
import { Box, Typography } from '@mui/material';
import VerbMatchingGame from './VerbMatchingGame';
import Sparkle from './sparkle';

const MatchingGameMode = ({
  questions,
  currentIndex,
  score,
  totalVerbs,
  feedback,
  showSparkles,
  isCompleted,
  handleMatchingComplete,
  handleRestart,
  language,
  tense,
  theme
}) => {
  
  // No questions available
  if (questions.length === 0) {
    return (
      <Typography variant="h6" sx={{ color: theme.secondary }}>
        That combination isn't available yet.
      </Typography>
    );
  }

  // Game completed
  if (isCompleted) {
    return (
      <Box sx={{ width: '100%', textAlign: 'center' }}>
        <Typography variant="h4" sx={{ 
          mb: 2, 
          color: theme.secondary, 
          fontFamily: "'Space Grotesk', sans-serif", 
          fontWeight: 700,
          fontStyle: theme.name === 'witchy' ? 'italic' : 'normal'
        }}>
          {score === totalVerbs ? theme.perfectEvalMessage :
          score > totalVerbs / 2 ? theme.goodEvalMessage :
          score > 0 ? theme.okayEvalMessage :
          theme.failEvalMessage} {theme.completeEmoji}
        </Typography>
        <Typography variant="h5" sx={{ 
          mb: 3, 
          color: theme.primary,
          fontStyle: theme.name === 'witchy' ? 'italic' : 'normal'
        }}>
          {score} of {totalVerbs} correct
        </Typography>
        <button
          onClick={handleRestart}
          style={{
            padding: '12px 24px',
            background: theme.primary,
            color: 'white',
            border: 'none',
            borderRadius: theme.buttonRadius,
            cursor: 'pointer',
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 500,
            fontSize: '1.1rem'
          }}
        >
          {theme.restartButtonText}
        </button>
      </Box>
    );
  }

  // Active game
  const currentQuestion = questions[currentIndex];

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ 
        minHeight: 200, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'start', 
        justifyContent: 'center',
        position: 'relative'
      }}>
        {showSparkles && <Sparkle theme={theme.name} />}

        <VerbMatchingGame
          currentQuestion={currentQuestion}
          language={language}
          tense={tense}
          verbForms={currentQuestion.forms}
          onComplete={handleMatchingComplete}
          theme={theme}
        />
      </Box>

      <Typography sx={{ 
        mt: 3, 
        color: theme.primary, 
        fontSize: '1rem',
        fontWeight: 500,
        fontStyle: theme.name === 'witchy' ? 'italic' : 'normal'
      }}>
        Score: {score} / {totalVerbs}
      </Typography>
    </Box>
  );
};

export default MatchingGameMode;