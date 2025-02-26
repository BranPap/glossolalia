// File: /src/components/GameQuestion.jsx
import React, { useEffect } from 'react';
import { Typography, Tooltip, TextField, Box, Button } from '@mui/material';

const GameQuestion = ({
  currentQuestion,
  answer,
  setAnswer,
  handleSubmit,
  handleShowAnswer,
  handleKeyDown,
  textFieldRef,
  isTouchDevice,
  theme,
  isTranslationMode,
  isReverseTranslation
}) => {
  // Add effect to listen for Tab key
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      // Tab key for showing answer
      if (e.key === 'Tab') {
        e.preventDefault(); // Prevent default tab behavior
        handleShowAnswer();
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [handleShowAnswer]);

  // Enhanced key handler that now handles both Enter and Tab
  const handleTextFieldKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const getPrompt = () => {
    if (!isTranslationMode) {
      return (
        <>
          {currentQuestion.pronoun}{' '}
          <span style={{ color: theme.accent }}>_</span>{' '}
          <Tooltip
            title={`(${currentQuestion.verbTranslation})`}
            arrow
            disableHoverListener={isTouchDevice}
            enterTouchDelay={0}
            leaveTouchDelay={1500}
          >
            <span style={{ cursor: 'pointer', color: theme.primary }}>
              ({currentQuestion.verb})
            </span>
          </Tooltip>
        </>
      );
    }

    const promptText = isReverseTranslation ? 
      currentQuestion.translation : 
      currentQuestion.verb;

    return (
      <>
        Translate: <span style={{ color: theme.accent }}>{promptText}</span>
      </>
    );
  };

  return (
    <>
      <Typography variant="h5" sx={{ 
        mb: 3, 
        color: theme.secondary,
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 500,
        lineHeight: 1.6,
        fontStyle: theme.name === 'witchy' ? 'italic' : 'normal'
      }}>
        {getPrompt()}
      </Typography>

      <TextField
        fullWidth
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        onKeyDown={handleTextFieldKeyDown}
        inputRef={textFieldRef}
        sx={{ 
          mb: 3,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: theme.accent,
              borderWidth: '2px',
              borderRadius: theme.buttonRadius
            },
            '& input': {
              color: theme.accent
            },
            '&:hover fieldset': {
              borderColor: theme.accentHover
            },
            '&.Mui-focused fieldset': {
              borderColor: theme.primary
            }
          }
        }}
      />

      <Box sx={{ 
        display: 'flex',
        gap: 2,
        alignItems: 'center'
      }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            px: 4,
            py: 1.5,
            background: theme.primary,
            borderRadius: theme.buttonRadius,
            '&:hover': { 
              background: theme.accentHover,
            },
            textTransform: 'none',
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 500,
            fontSize: '1.1rem'
          }}
        >
          {theme.checkButtonText} 
        </Button>

        <Button
          variant="outlined"
          onClick={handleShowAnswer}
          sx={{
            px: 4,
            py: 1.5,
            color: theme.primary,
            borderColor: theme.accent,
            borderWidth: '2px',
            borderRadius: theme.buttonRadius,
            '&:hover': { 
              borderColor: theme.accentHover,
              borderWidth: '2px',
              background: `${theme.accent}10`
            },
            textTransform: 'none',
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 500,
            fontSize: '1.1rem'
          }}
        >
          {theme.showAnswerButtonText || "Show Answer"} 
        </Button>
      </Box>

      <Typography variant="body2" sx={{ 
        mt: 2, 
        color: theme.secondary, 
        opacity: 0.7,
        fontStyle: 'italic'
      }}>
        Keyboard shortcuts: Press Enter to check answer, Tab to show answer
      </Typography>
    </>
  );
};

export default GameQuestion;