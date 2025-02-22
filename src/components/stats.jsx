import React, { useMemo } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent
} from '@mui/material';

const StatsDialog = ({ open, onClose, verbs, theme, currentTheme }) => {
  const stats = useMemo(() => {
    // Count verbs per language
    const languageCounts = verbs.reduce((acc, verb) => {
      acc[verb.language] = (acc[verb.language] || 0) + 1;
      return acc;
    }, {});

    // Count tenses per language
    const tenseCounts = verbs.reduce((acc, verb) => {
      const language = verb.language;
      if (!acc[language]) {
        acc[language] = new Set();
      }
      acc[language] = new Set([...acc[language], ...Object.keys(verb.forms || {})]);
      return acc;
    }, {});

    // Get verb forms per language-tense pair
    const languageTensePairs = verbs.reduce((acc, verb) => {
      Object.keys(verb.forms || {}).forEach(tense => {
        const key = `${verb.language}-${tense}`;
        acc[key] = (acc[key] || 0) + 1;
      });
      return acc;
    }, {});

    // Calculate total forms
    const totalForms = Object.values(languageTensePairs).reduce((a, b) => a + b, 0);

    return {
      languageCounts,
      tenseCounts: Object.fromEntries(
        Object.entries(tenseCounts).map(([k, v]) => [k, v.size])
      ),
      totalForms,
      totalVerbs: verbs.length
    };
  }, [verbs]);

  const textColor = currentTheme === 'cyberpunk' ? '#000000' : theme.secondary;

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 2,
          padding: 2,
          background: '#fafafa',
          maxWidth: 800,
          width: '90vw'
        }
      }}
    >
      <DialogTitle sx={{ 
        fontFamily: "'Space Grotesk', sans-serif",
        color: textColor
      }}>
        Glossolalia Statistics
      </DialogTitle>
      <DialogContent>
        <div className="space-y-6">
          {/* Summary section */}
          <div className="space-y-4">
            <p className="text-lg" style={{ 
              fontFamily: "'Space Grotesk', sans-serif",
              color: theme.primary 
            }}>
              Currently in the database:
            </p>
            <ul className="space-y-2 list-none">
              {Object.entries(stats.languageCounts).map(([language, count]) => (
                <li key={language} style={{ color: textColor }}>
                  <span className="font-bold">{language}</span>: {count} verbs with {' '}
                  {stats.tenseCounts[language]} tense{stats.tenseCounts[language] > 1 ? 's' : ''} {' '}
                  ({Object.entries(verbs.find(v => v.language === language).forms).map(([tense]) => tense).join(', ')})
                </li>
              ))}
            </ul>
            <p style={{ color: textColor }}>
              Total conjugation forms available: <span className="font-bold">{stats.totalForms}</span>
            </p>
          </div>

          {/* Development note */}
          <p className="text-sm italic mt-4" style={{ color: textColor }}>
            Note: This app is under active development, with new verbs and forms being added regularly.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StatsDialog;