import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, 
    DialogTitle as MuiDialogTitle, 
    IconButton, Typography, Box, Divider, List, ListItem, ListItemText } 
from '@mui/material';
import { BarChart, Assessment, Close, DeleteOutline } from '@mui/icons-material';
const ScoreHistory = ({ open, onClose, theme }) => {
  const [scoreHistory, setScoreHistory] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  
  useEffect(() => {
    if (open) {
      try {
        const storedScores = localStorage.getItem('glossolaliaScores');
        if (storedScores) {
          setScoreHistory(JSON.parse(storedScores));
        }
      } catch (error) {
        console.error('Failed to load score history:', error);
      }
    }
  }, [open]);

  const handleClearHistory = () => {
    try {
      localStorage.removeItem('glossolaliaScores');
      setScoreHistory([]);
      setConfirmOpen(false);
    } catch (error) {
      console.error('Failed to clear history:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getAverageScore = () => {
    if (scoreHistory.length === 0) return 0;
    const sum = scoreHistory.reduce((total, item) => total + (item.score / item.total * 100), 0);
    return (sum / scoreHistory.length).toFixed(1);
  };

  return (
    <>
      <Dialog 
        open={open} 
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 2,
            padding: 2,
            background: '#fafafa'
          }
        }}
      >
        <MuiDialogTitle sx={{ 
          fontFamily: "'Space Grotesk', sans-serif",
          color: theme.secondary,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Box display="flex" alignItems="center">
            <Assessment sx={{ mr: 1 }} />
            Your Learning Journey
          </Box>
          <Box>
            {scoreHistory.length > 0 && (
              <IconButton 
                onClick={() => setConfirmOpen(true)} 
                size="small" 
                sx={{ mr: 1, color: theme.secondary }}
                aria-label="Clear history"
              >
                <DeleteOutline />
              </IconButton>
            )}
            <IconButton onClick={onClose} size="small">
              <Close />
            </IconButton>
          </Box>
        </MuiDialogTitle>
        <DialogContent>
        {scoreHistory.length > 0 ? (
          <>
            <Box sx={{ mb: 3, p: 2, backgroundColor: `${theme.accent}15`, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ fontFamily: "'Space Grotesk', sans-serif", color: theme.primary }}>
                Statistics
              </Typography>
              <Box display="flex" justifyContent="space-between" mt={1}>
                <Typography sx={{ fontFamily: "'Space Grotesk', sans-serif", color: theme.secondary }}>
                  Practice Sessions: {scoreHistory.length}
                </Typography>
                <Typography sx={{ fontFamily: "'Space Grotesk', sans-serif", color: theme.secondary }}>
                  Average Score: {getAverageScore()}%
                </Typography>
              </Box>
            </Box>
            <Typography variant="h6" sx={{ 
              fontFamily: "'Space Grotesk', sans-serif", 
              color: theme.secondary,
              mb: 1
            }}>
              Recent Sessions
            </Typography>
            <List sx={{ maxHeight: 300, overflow: 'auto' }}>
              {scoreHistory.map((item, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText 
                      primary={
                        <Typography sx={{ fontFamily: "'Space Grotesk', sans-serif", color: theme.primary }}>
                          {item.language} • {item.mode === 'conjugation' 
                            ? `Conjugation (${item.tense})` 
                            : (item.mode === 'translation' 
                              ? 'Translation' 
                              : (item.mode === 'translationReverse' 
                                ? 'Reverse Translation' 
                                : (item.mode === 'training' 
                                  ? `Training (${item.tense})` 
                                  : item.mode)))}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" sx={{ fontFamily: "'Space Grotesk', sans-serif", color: theme.secondary }}>
                            {formatDate(item.date)}
                          </Typography>
                          <Typography variant="body1" sx={{ 
                            fontFamily: "'Space Grotesk', sans-serif", 
                            color: theme.accent,
                            fontWeight: 600
                          }}>
                            Score: {item.score}/{item.total} ({(item.score/item.total*100).toFixed(0)}%)
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                  {index < scoreHistory.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </>
        ) : (
          <Box display="flex" flexDirection="column" alignItems="center" py={3}>
            <BarChart sx={{ fontSize: 60, color: `${theme.accent}50`, mb: 2 }} />
            <Typography variant="h6" sx={{ fontFamily: "'Space Grotesk', sans-serif", color: theme.secondary }}>
              No practice history yet
            </Typography>
            <Typography sx={{ fontFamily: "'Space Grotesk', sans-serif", color: theme.secondary, textAlign: 'center', mt: 1 }}>
              Complete a practice session to start tracking your progress
            </Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
    <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        aria-labelledby="clear-history-dialog-title"
      >
        <MuiDialogTitle id="clear-history-dialog-title">
          Clear Practice History
        </MuiDialogTitle>
        <DialogContent>
          <DialogContentText sx={{ 
            fontFamily: "'Space Grotesk', sans-serif",
            color: theme.secondary 
          }}>
            Are you sure you want to clear your practice history? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setConfirmOpen(false)} 
            sx={{ 
              color: theme.secondary, 
              fontFamily: "'Space Grotesk', sans-serif" 
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleClearHistory} 
            sx={{ 
              color: theme.incorrect || '#dc2626',
              fontFamily: "'Space Grotesk', sans-serif"
            }}
            autoFocus
          >
            Clear History
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ScoreHistory;