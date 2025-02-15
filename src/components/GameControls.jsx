import React from 'react';
import { Box, Select, MenuItem, Typography, Switch, FormControlLabel, ToggleButtonGroup, ToggleButton } from '@mui/material';

const GameControls = ({ 
  isTranslationMode, 
  setIsTranslationMode, 
  language, 
  tense, 
  handleLanguageChange, 
  setTense,
  availableTenses,
  isReverseTranslation,
  setIsReverseTranslation,
  theme 
}) => {
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <ToggleButtonGroup
          value={isTranslationMode ? 'translation' : 'conjugation'}
          exclusive
          onChange={(e, newMode) => {
            if (newMode !== null) {
              setIsTranslationMode(newMode === 'translation');
            }
          }}
          sx={{
            '& .MuiToggleButton-root': {
              textTransform: 'none',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 500,
              px: 3,
              py: 1,
              color: theme.secondary,
              borderColor: theme.accent,
              '&.Mui-selected': {
                backgroundColor: `${theme.accent}20`,
                color: theme.primary,
                '&:hover': {
                  backgroundColor: `${theme.accent}30`,
                }
              },
              '&:hover': {
                backgroundColor: `${theme.accent}10`,
              }
            }
          }}
        >
          <ToggleButton value="conjugation">
            Conjugation Mode
          </ToggleButton>
          <ToggleButton value="translation">
            Translation Mode
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ 
        display: 'flex', 
        gap: 4,
        mb: 4,
        alignItems: 'flex-end'
      }}>
        <Box>
          <Typography sx={{ 
            mb: 1, 
            color: theme.secondary, 
            fontFamily: "'Space Grotesk', sans-serif", 
            fontWeight: 500 
          }}>
            Language
          </Typography>
          <Select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            sx={{ 
              minWidth: 150,
              color: theme.secondary,
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: theme.secondary,
                borderWidth: '2px'
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.primary
              }
            }}
          >
            <MenuItem value="Finnish">Finnish</MenuItem>
            <MenuItem value="Lithuanian">Lithuanian</MenuItem>
            <MenuItem value="Spanish">Spanish</MenuItem>
          </Select>
        </Box>
      
        {!isTranslationMode && (
          <Box>
            <Typography sx={{ 
              mb: 1, 
              color: theme.secondary, 
              fontFamily: "'Space Grotesk', sans-serif", 
              fontWeight: 500 
            }}>
              Tense
            </Typography>
            <Select
              value={tense}
              onChange={(e) => setTense(e.target.value)}
              sx={{ 
                minWidth: 150,
                color: theme.secondary,
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.secondary,
                  borderWidth: '2px'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.primary
                }
              }}
            >
              {availableTenses.map(t => (
                <MenuItem key={t} value={t}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </Box>
        )}

        {isTranslationMode && (
          <FormControlLabel
            control={
              <Switch
                checked={isReverseTranslation}
                onChange={(e) => setIsReverseTranslation(e.target.checked)}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: theme.primary,
                    '&:hover': {
                      backgroundColor: `${theme.primary}10`
                    }
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: theme.primary
                  }
                }}
              />
            }
            label={
              <Typography sx={{ 
                color: theme.secondary,
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 500
              }}>
                Reverse direction
              </Typography>
            }
          />
        )}
      </Box>
    </>
  );
};

export default GameControls;