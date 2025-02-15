import React, { useState, useEffect } from 'react';
import { Card, IconButton } from '@mui/material';

const ThemeSelector = ({ themes, currentTheme, setCurrentTheme }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Collapse when theme changes
  useEffect(() => {
    setIsExpanded(false);
  }, [currentTheme]);

  const handleThemeChange = (themeName, event) => {
    event.stopPropagation(); // Stop event from bubbling
    
    if (themeName === currentTheme && !isExpanded) {
      // If clicking the current theme icon while collapsed, expand
      setIsExpanded(true);
    } else {
      // Change theme and collapse
      setCurrentTheme(themeName);
      setIsExpanded(false);
    }
  };

  // Separate desktop hover handlers
  const handleMouseEnter = () => {
    if (window.matchMedia('(hover: hover)').matches) {
      setIsExpanded(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.matchMedia('(hover: hover)').matches) {
      setIsExpanded(false);
    }
  };

  return (
    <Card
      elevation={8}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        position: 'fixed',
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
        flexDirection: { xs: 'row', md: 'column' },
        gap: 1,
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
        width: { 
          xs: isExpanded ? 'auto' : '48px',
          md: '48px'
        },
        height: {
          xs: '48px',
          md: isExpanded ? 'auto' : '48px'
        },
        '&:hover': {
          boxShadow: 16
        },
        zIndex: 1000,
        touchAction: 'none'
      }}
    >
      {Object.entries(themes).map(([themeName, theme], index) => (
        <IconButton
          key={themeName}
          onClick={(e) => handleThemeChange(themeName, e)}
          sx={{
            p: { xs: 1, md: 1.5 },
            fontSize: { xs: '1.25rem', md: '1.5rem' },
            transform: !isExpanded && themeName !== currentTheme ? 
              'scale(0.5) translateX(-100%)' : 'scale(1) translateX(0)',
            opacity: !isExpanded && themeName !== currentTheme ? 0 : 1,
            position: !isExpanded && themeName !== currentTheme ? 'absolute' : 'relative',
            backgroundColor: currentTheme === themeName ? 
              `${themes[currentTheme].accent}20` : 'transparent',
            '&:hover': {
              backgroundColor: `${themes[themeName].accent}20`
            },
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            visibility: !isExpanded && themeName !== currentTheme ? 'hidden' : 'visible',
            transitionDelay: isExpanded ? `${index * 50}ms` : '0ms',
          }}
        >
          {theme.themeIcon}
        </IconButton>
      ))}
    </Card>
  );
};

export default ThemeSelector;