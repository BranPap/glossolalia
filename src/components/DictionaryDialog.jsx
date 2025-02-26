import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle as MuiDialogTitle, 
  DialogContent,
  Box,
  IconButton,
  Typography,
  TextField,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  Tab,
  Tabs,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Divider
} from '@mui/material';
import { Close, Search, ExpandMore } from '@mui/icons-material';

const DictionaryDialog = ({ open, onClose, verbs, theme, currentLanguage }) => {
  const [language, setLanguage] = useState(currentLanguage || 'Finnish');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
  const [filteredVerbs, setFilteredVerbs] = useState([]);

  useEffect(() => {
    if (open) {
      // Set initial language from props when dialog opens
      setLanguage(currentLanguage || 'Finnish');
      // Reset search and filters
      setSearchTerm('');
      setSelectedTab('all');
    }
  }, [open, currentLanguage]);

  useEffect(() => {
    // Filter verbs based on language, search term and tab
    let filtered = verbs.filter(verb => verb.language === language);
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(verb => 
        verb.verb.toLowerCase().includes(term) || 
        verb.translation.toLowerCase().includes(term)
      );
    }
    
    if (selectedTab !== 'all') {
      filtered = filtered.filter(verb => {
        // Check if verb has forms for the selected tense
        return verb.forms && verb.forms[selectedTab];
      });
    }
    
    setFilteredVerbs(filtered);
  }, [verbs, language, searchTerm, selectedTab]);

  const getAvailableTenses = () => {
    // Get all unique tenses available for the current language
    const tenses = new Set();
    verbs
      .filter(verb => verb.language === language)
      .forEach(verb => {
        if (verb.forms) {
          Object.keys(verb.forms).forEach(tense => tenses.add(tense));
        }
      });
    return ['all', ...Array.from(tenses)];
  };

  const renderVerbForms = (verb) => {
    if (!verb.forms) return null;
    
    const tenses = Object.keys(verb.forms);
    if (selectedTab !== 'all' && !tenses.includes(selectedTab)) return null;
    
    // Only show forms for the selected tense, or all tenses if 'all' is selected
    const tensesToShow = selectedTab === 'all' ? tenses : [selectedTab];
    
    return tensesToShow.map(tense => (
      <Box key={tense} sx={{ mb: 2 }}>
        <Typography sx={{ 
          fontWeight: 600, 
          color: theme.primary, 
          fontFamily: "'Space Grotesk', sans-serif",
          mb: 1
        }}>
          {tense.charAt(0).toUpperCase() + tense.slice(1)}
        </Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 1 }}>
          {Object.entries(verb.forms[tense]).map(([person, { pronoun, form }]) => (
            <Box 
              key={person} 
              sx={{ 
                border: `1px solid ${theme.accent}30`, 
                borderRadius: 1, 
                p: 1,
                '&:hover': {
                  backgroundColor: `${theme.accent}10`
                }
              }}
            >
              <Typography variant="body2" sx={{ color: theme.secondary, fontWeight: 500 }}>
                {pronoun}
              </Typography>
              <Typography variant="body1" sx={{ color: theme.primary, fontWeight: 600 }}>
                {form}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    ));
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 2,
          padding: 2,
          background: '#fafafa',
          height: '80vh'
        }
      }}
    >
      <MuiDialogTitle sx={{ 
        fontFamily: "'Space Grotesk', sans-serif",
        color: theme.secondary,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        pb: 1
      }}>
        <Typography variant="h5" fontFamily="'Space Grotesk', sans-serif">
          Verb Dictionary
        </Typography>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </MuiDialogTitle>

      <Box sx={{ px: 3, pb: 2, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <Select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            sx={{ 
              color: theme.secondary,
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: theme.secondary,
              }
            }}
            size="small"
          >
            <MenuItem value="Finnish">Finnish</MenuItem>
            <MenuItem value="Lithuanian">Lithuanian</MenuItem>
            <MenuItem value="Spanish">Spanish</MenuItem>
          </Select>
        </FormControl>

        <TextField
          placeholder="Search verbs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: theme.secondary }} />
              </InputAdornment>
            ),
          }}
          sx={{ 
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: theme.secondary,
              },
            }
          }}
        />
      </Box>

      <Tabs 
        value={selectedTab} 
        onChange={(e, newValue) => setSelectedTab(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ 
          px: 2,
          borderBottom: 1, 
          borderColor: 'divider',
          '& .MuiTab-root': {
            textTransform: 'capitalize',
            fontFamily: "'Space Grotesk', sans-serif",
            minWidth: 'auto',
          },
          '& .Mui-selected': {
            color: `${theme.primary} !important`,
          },
          '& .MuiTabs-indicator': {
            backgroundColor: theme.primary,
          }
        }}
      >
        {getAvailableTenses().map(tense => (
          <Tab 
            key={tense} 
            label={tense === 'all' ? 'All Tenses' : tense.charAt(0).toUpperCase() + tense.slice(1)} 
            value={tense}
          />
        ))}
      </Tabs>

      <DialogContent sx={{ pt: 2 }}>
        {filteredVerbs.length > 0 ? (
          <>
            <Typography variant="body2" sx={{ mb: 2, color: theme.secondary }}>
              {filteredVerbs.length} {filteredVerbs.length === 1 ? 'verb' : 'verbs'} found
            </Typography>
            
            {filteredVerbs.map((verb) => (
              <Accordion 
                key={verb.verb} 
                sx={{ 
                  mb: 1,
                  '&:before': {
                    display: 'none',
                  },
                  boxShadow: 'none',
                  border: `1px solid ${theme.accent}30`,
                  '&.Mui-expanded': {
                    margin: '8px 0',
                  }
                }}
              >
                <AccordionSummary 
                  expandIcon={<ExpandMore sx={{ color: theme.primary }} />}
                  sx={{ 
                    '&.Mui-expanded': {
                      minHeight: '48px',
                      borderBottom: `1px solid ${theme.accent}30`,
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, gap: 1 }}>
                    <Typography 
                      sx={{ 
                        fontWeight: 600, 
                        color: theme.primary, 
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '1.1rem'
                      }}
                    >
                      {verb.verb}
                    </Typography>
                    
                    <Typography sx={{ color: theme.secondary }}>
                      — {verb.translation}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 2 }}>
                  {renderVerbForms(verb)}
                </AccordionDetails>
              </Accordion>
            ))}
          </>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Typography sx={{ color: theme.secondary, textAlign: 'center', fontFamily: "'Space Grotesk', sans-serif" }}>
              {searchTerm 
                ? "No verbs match your search criteria" 
                : "No verbs available for the selected options"}
            </Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DictionaryDialog;