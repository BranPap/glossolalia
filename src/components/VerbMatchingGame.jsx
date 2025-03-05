import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button, Chip } from '@mui/material';

const VerbMatchingGame = ({ 
  currentQuestion, 
  language,
  tense,
  verbForms,
  onComplete,
  theme
}) => {
  const [matches, setMatches] = useState({});
  const [availableForms, setAvailableForms] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedVerb, setSelectedVerb] = useState(null);
  
  // Initialize the game
  useEffect(() => {
    const forms = Object.entries(verbForms).map(([key, data]) => ({
      id: key,
      pronoun: data.pronoun,
      form: data.form
    }));
    
    // Shuffle the forms for the word bank
    const shuffledForms = [...forms].sort(() => Math.random() - 0.5);
    setAvailableForms(shuffledForms.map(form => form.form));
    
    // Initialize empty matches
    const initialMatches = {};
    forms.forEach(form => {
      initialMatches[form.id] = null;
    });
    setMatches(initialMatches);
    
    setIsComplete(false);
    setScore(0);
    setFeedback('');
    setSelectedVerb(null);
  }, [verbForms]);

  // Select a verb from the bank
  const handleSelectVerb = (verb) => {
    // If the verb is already selected, deselect it
    if (selectedVerb === verb) {
      setSelectedVerb(null);
      return;
    }
    
    setSelectedVerb(verb);
  };

  // Assign the selected verb to a pronoun slot
  const handleAssignVerb = (slotId) => {
    if (!selectedVerb || isComplete) return;
    
    const existingVerbInSlot = matches[slotId];
    const newMatches = { ...matches };
    
    // Step 1: Handle the existing verb in the slot
    if (existingVerbInSlot) {
      // Add back the existing verb to available forms if not used elsewhere
      const isUsedElsewhere = Object.entries(newMatches)
        .some(([key, verb]) => key !== slotId && verb === existingVerbInSlot);
  
      if (!isUsedElsewhere) {
        setAvailableForms(prevForms => [...prevForms, existingVerbInSlot]);
      }
    }
  
    // Step 2: Remove the selected verb from its previous slot if assigned elsewhere
    Object.entries(newMatches).forEach(([key, verb]) => {
      if (verb === selectedVerb) {
        newMatches[key] = null;
  
        // Avoid adding back if already available to prevent duplicates
        if (!availableForms.includes(selectedVerb)) {
          setAvailableForms(prevForms => [...prevForms, selectedVerb]);
        }
      }
    });
  
    // Step 3: Assign the verb to the new slot
    newMatches[slotId] = selectedVerb;
    setMatches(newMatches);
  
    // Step 4: Remove the selected verb from available forms
    setAvailableForms(prevForms => prevForms.filter(v => v !== selectedVerb));
  
    // Step 5: Clear selection
    setSelectedVerb(null);
  };
  

  // Reset a verb assignment
  const handleResetAssignment = (slotId) => {
    if (isComplete) return;
    
    const verbToReset = matches[slotId];
    if (!verbToReset) return;
    
    // Remove the assignment
    const newMatches = { ...matches };
    newMatches[slotId] = null;
    setMatches(newMatches);
    
    // Add the verb back to available if it's not used elsewhere
    const isUsedElsewhere = Object.entries(newMatches)
      .some(([key, verb]) => key !== slotId && verb === verbToReset);
      
    if (!isUsedElsewhere && !availableForms.includes(verbToReset)) {
      setAvailableForms(prevForms => [...prevForms, verbToReset]);
    }
  };

  // Check answers
  const handleCheck = () => {
    // Ensure all slots are filled
    const allFilled = Object.values(matches).every(match => match !== null);
    if (!allFilled) {
      setFeedback('Please fill all pronoun slots before checking your answers.');
      return;
    }

    // Check each match
    let correctCount = 0;
    Object.entries(verbForms).forEach(([key, data]) => {
      if (matches[key] === data.form) {
        correctCount++;
      }
    });

    setScore(correctCount);
    setIsComplete(true);
    
    if (correctCount === Object.keys(verbForms).length) {
      setFeedback(`${theme.perfectEvalMessage} You matched all conjugations correctly!`);
    } else if (correctCount > Object.keys(verbForms).length / 2) {
      setFeedback(`${theme.goodEvalMessage} You got ${correctCount} out of ${Object.keys(verbForms).length} correct.`);
    } else {
      setFeedback(`${theme.okayEvalMessage} You got ${correctCount} out of ${Object.keys(verbForms).length} correct.`);
    }

    // Call onComplete with score
    if (onComplete) {
      onComplete(correctCount, Object.keys(verbForms).length);
    }
  };

  // Reset the game
  const handleReset = () => {
    const forms = Object.entries(verbForms).map(([key, data]) => ({
      id: key,
      pronoun: data.pronoun,
      form: data.form
    }));
    
    const shuffledForms = [...forms].sort(() => Math.random() - 0.5);
    setAvailableForms(shuffledForms.map(form => form.form));
    
    const initialMatches = {};
    forms.forEach(form => {
      initialMatches[form.id] = null;
    });
    setMatches(initialMatches);
    
    setIsComplete(false);
    setScore(0);
    setFeedback('');
    setSelectedVerb(null);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h5" sx={{ 
        mb: 3, 
        color: theme.secondary,
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 500,
        fontStyle: theme.name === 'witchy' ? 'italic' : 'normal'
      }}>
        Match the correct forms of <span style={{ color: theme.accent }}>{currentQuestion?.verb || ''}</span>
        {currentQuestion?.verbTranslation && ` (${currentQuestion.verbTranslation})`} for {tense} tense
      </Typography>

      {/* Pronoun boxes for matching */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
        gap: 2,
        mb: 4
      }}>
        {Object.entries(verbForms).map(([key, data]) => (
          <Paper
            key={key}
            elevation={2}
            onClick={() => handleAssignVerb(key)}
            sx={{ 
              p: 2,
              minHeight: 90,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: selectedVerb ? `${theme.accent}10` : 'white',
              border: isComplete 
                ? (matches[key] === data.form ? `2px solid ${theme.correct}` : `2px solid ${theme.incorrect}`)
                : `2px solid ${theme.accent}30`,
              borderRadius: theme.buttonRadius,
              cursor: selectedVerb && !isComplete ? 'pointer' : 'default',
              transition: 'all 0.2s'
            }}
          >
            <Typography sx={{ 
              mb: 1, 
              fontWeight: 600,
              color: theme.secondary
            }}>
              {data.pronoun}
            </Typography>
            
            {matches[key] && (
              <Box 
                sx={{ 
                  p: 1,
                  width: '100%',
                  textAlign: 'center',
                  backgroundColor: isComplete 
                    ? (matches[key] === data.form ? `${theme.correct}30` : `${theme.incorrect}30`)
                    : `${theme.accent}20`,
                  borderRadius: theme.buttonRadius,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative'
                }}
              >
                <Typography sx={{ fontWeight: 500 }}>
                  {matches[key]}
                </Typography>

                {!isComplete && (
                  <Box 
                    onClick={(e) => {
                      e.stopPropagation(); 
                      handleResetAssignment(key);
                    }}
                    sx={{
                      position: 'absolute',
                      right: 8,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: theme.secondary,
                      fontSize: '18px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      opacity: 0.6,
                      '&:hover': {
                        opacity: 1
                      }
                    }}
                  >
                    ×
                  </Box>
                )}
              </Box>
            )}

            {!matches[key] && (
              <Box 
                sx={{ 
                  p: 1,
                  width: '100%',
                  height: 38,
                  textAlign: 'center',
                  backgroundColor: `${theme.accent}10`,
                  borderRadius: theme.buttonRadius,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Typography sx={{ 
                  color: `${theme.accent}60`, 
                  fontSize: '0.9rem' 
                }}>
                  Drop here
                </Typography>
              </Box>
            )}
          </Paper>
        ))}
      </Box>

      {/* Verb Bank */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography sx={{ 
            color: theme.secondary, 
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600
          }}>
            Verb Forms
          </Typography>
        </Box>

        <Box
          sx={{ 
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1.5,
            minHeight: 60,
            p: 2,
            backgroundColor: `${theme.accent}05`,
            borderRadius: theme.buttonRadius
          }}
        >
          {availableForms.map((form, index) => (
            <Chip
              key={`${form}-${index}`}
              label={form}
              onClick={() => handleSelectVerb(form)}
              sx={{ 
                backgroundColor: selectedVerb === form ? `${theme.primary}40` : `${theme.primary}10`,
                color: selectedVerb === form ? 'white' : theme.secondary,
                borderRadius: theme.buttonRadius,
                fontWeight: 500,
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: selectedVerb === form ? `${theme.primary}40` : `${theme.primary}20`,
                },
                transition: 'all 0.2s'
              }}
              disabled={isComplete}
            />
          ))}
          
          {Object.values(matches).map((verb, index) => (
            verb && !availableForms.includes(verb) && !isComplete && (
              <Chip
                key={`used-${verb}-${index}`}
                label={verb}
                sx={{ 
                  backgroundColor: `${theme.accent}30`,
                  opacity: 0.6,
                  borderRadius: theme.buttonRadius,
                  fontWeight: 500,
                }}
                disabled
              />
            )
          ))}
          
          {availableForms.length === 0 && Object.values(matches).every(m => m !== null) && (
            <Typography sx={{ color: theme.secondary, fontStyle: 'italic' }}>
              All verbs assigned
            </Typography>
          )}
        </Box>
      </Box>

      {/* Instructions */}
      {!isComplete && (
        <Typography variant="body2" sx={{ 
          mt: 0, 
          mb: 3,
          color: theme.secondary,
          fontStyle: 'italic'
        }}>
          {selectedVerb 
            ? `Click on a pronoun box to place "${selectedVerb}"`
            : "Select a verb form, then click a pronoun box to place it"}
        </Typography>
      )}

      {/* Feedback */}
      {feedback && (
        <Typography 
          sx={{ 
            mt: 2, 
            mb: 3,
            color: isComplete 
              ? (score === Object.keys(verbForms).length ? theme.correct : theme.incorrect)
              : theme.secondary,
            fontWeight: 500,
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.2rem',
            fontStyle: theme.name === 'witchy' ? 'italic' : 'normal'
          }}
        >
          {feedback}
        </Typography>
      )}

      {/* Controls */}
      <Box sx={{ 
        display: 'flex',
        gap: 2,
        mt: 2
      }}>
        {!isComplete ? (
          <Button
            variant="contained"
            onClick={handleCheck}
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
            Check Answers
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleReset}
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
            Try Again
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default VerbMatchingGame;