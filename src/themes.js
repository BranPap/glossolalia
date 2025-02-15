// themes.js
export const themes = {
    modern: {
      background: 'linear-gradient(135deg, rgb(101, 8, 207) 0%, rgb(79, 200, 244) 100%)',
      cardBorder: 'linear-gradient(90deg, #6366f1,rgb(112, 189, 194))',
      primary: '#4f46e5',
      secondary: '#312e81',
      accent: '#818cf8',
      accentHover: '#6366f1',
      progressBg: '#e0e7ff',
      progressBar: '#4f46e5',
      correct: '#09bc8a',
      incorrect: '#dc2626',
      // Theme-specific content
      subtitle: '⟢ speak in new tongues',
      completeEmoji: '🎉',
      completeMessage: 'Practice complete',
      buttonRadius: '4px',
      checkButtonText: 'Check',
      restartButtonText: 'Go again',
      revealMessageInflectional: `No worries, the correct form is `,
      revealMessageTranslation: `No worries, the correct translation is `,
      perfectEvalMessage: 'A perfect session!',
      goodEvalMessage: 'Nicely done!',
      okayEvalMessage: 'Making progress!',
      failEvalMessage: 'Uh oh... want to try again?',
      // Icons
      themeIcon: '📍',
      cursor: 'default'
    },
    witchy: {
      background: 'linear-gradient(135deg, #FFE5E5 0%, #FFD1DC 100%)',
      cardBorder: 'linear-gradient(90deg, #FFB6C1, #FFC0CB)',
      primary: '#FF69B4',
      secondary: '#C71585',
      accent: '#DDA0DD',
      accentHover: '#FF69B4',
      progressBg: '#FFF0F5',
      progressBar: '#FF69B4',
      correct: '#98FB98',
      incorrect: '#FF6B6B',
      // Theme-specific content
      subtitle: '✨ divine new grammars',
      completeEmoji: '🔮',
      completeMessage: 'Enchantment complete',
      buttonRadius: '20px',
      checkButtonText: 'Cast spell',
      restartButtonText: 'Cast again',
      showAnswerButtonText: 'Reveal',
      revealMessageInflectional: `Ask and you shall receive: the correct form is `,
      revealMessageTranslation: `Ask and you shall receive: the correct translation is `,
      perfectEvalMessage: 'A perfect spell!',
      goodEvalMessage: 'Well cast!',
      okayEvalMessage: 'Making progress!',
      failEvalMessage: 'The gods are worried... try again?',
      // Icons
      themeIcon: '🌙',
      cursor: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'48\' viewport=\'0 0 100 100\' style=\'fill:black;font-size:24px;\'><text y=\'50%\'>🪄</text></svg>") 16 0, auto'
    },
    cyberpunk: {
        background: 'linear-gradient(135deg, #000000 0%,rgb(3, 75, 18) 100%)',
        cardBorder: 'linear-gradient(90deg,rgb(0, 255, 72),rgb(0, 255, 115))',
        primary: 'rgb(19, 202, 71)',
        secondary: '#fafafa',
        accent: '#fafafa',
        accentHover: '#ff00ea',
        progressBg: '#fafafa',
        progressBar: 'rgb(16, 215, 73)',
        correct: '#39ff14',
        incorrect: '#ff0000',
        subtitle: '⚡ hack the language matrix',
        completeEmoji: '🤖',
        completeMessage: 'System upgraded',
        buttonRadius: '0px',
        checkButtonText: 'return(answer)',
        showAnswerButtonText: 'console.log(help)',
        revealMessageInflectional: `const correctForm = `,
        revealMessageTranslation: `const correctTranslation = `,
        perfectEvalMessage: 'Total knowledge base access granted!',
        goodEvalMessage: 'Nicely done!',
        okayEvalMessage: 'On your way to the mainframe!',
        failEvalMessage: 'Abort program... want to try again?',
        restartButtonText: 'Reboot',
        themeIcon: '💻',
        cursor: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'48\' viewport=\'0 0 100 100\' style=\'fill:black;font-size:24px;\'><text y=\'50%\'>⚡️</text></svg>") 16 0, auto'
      },
      forest: {
        background: 'linear-gradient(135deg, #2d5a27 0%, #8fbc8f 100%)',
        cardBorder: 'linear-gradient(90deg, #556b2f, #8fbc8f)',
        primary: '#2d5a27',
        secondary: '#1b4d3e',
        accent: '#90ee90',
        accentHover: '#556b2f',
        progressBg: '#dcedc8',
        progressBar: '#2d5a27',
        correct: '#32cd32',
        incorrect: '#8b0000',
        subtitle: '🌿 grow your language roots',
        completeEmoji: '🌻',
        completeMessage: 'You have blossomed',
        buttonRadius: '8px',
        checkButtonText: 'Plant seed',
        restartButtonText: 'Sow again',
        showAnswerButtonText: 'Show answer',
        revealMessageInflectional: `That's okay, growth takes time! The form you're looking for is `,
        revealMessageTranslation: `That's okay, growth takes time! The right translation is: `,
        themeIcon: '🌱',
        cursor: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'48\' viewport=\'0 0 100 100\' style=\'fill:black;font-size:24px;\'><text y=\'50%\'>🌲</text></svg>") 16 0, auto'
      },
      ocean: {
        background: 'linear-gradient(135deg, #000080 0%, #00ffff 100%)',
        cardBorder: 'linear-gradient(90deg, #00bfff, #87ceeb)',
        primary: '#000080',
        secondary: '#004466',
        accent: '#00bfff',
        accentHover: '#0099cc',
        progressBg: '#e0ffff',
        progressBar: '#000080',
        correct: '#20b2aa',
        incorrect: '#ff4040',
        subtitle: '🌊 dive into languages',
        completeEmoji: '🐋',
        completeMessage: 'Deep knowledge achieved',
        buttonRadius: '12px',
        checkButtonText: 'Take the plunge',
        restartButtonText: 'New wave',
        showAnswerButtonText: 'Lure answer',
        revealMessageInflectional: `The siren sings 🧜🏿‍♀️: the truth is `,
        revealMessageTranslation: `The siren sings 🧜🏿‍♀️: the truth is `,
        perfectEvalMessage: 'Ink-credible 🐙!',
        goodEvalMessage: 'You\'re swimming with dolphins now!',
        okayEvalMessage: 'One wave at a time!',
        failEvalMessage: 'Shipwrecked... want to try again?',
        themeIcon: '🐠',
        cursor: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'48\' viewport=\'0 0 100 100\' style=\'fill:black;font-size:24px;\'><text y=\'50%\'>🦑</text></svg>") 16 0, auto'
      },
      cosmic: {
        background: 'linear-gradient(135deg, #2A0845 0%, #6441A5 100%)',
        cardBorder: 'linear-gradient(90deg, #8A2BE2, #DA70D6)',
        primary: '#2A0845',
        secondary: '#4B0082',
        accent: '#9370DB',
        accentHover: '#6A5ACD',
        progressBg: '#E6E6FA',
        progressBar: '#8A2BE2',
        correct: '#7FFFD4',
        incorrect: '#FF1493',
        subtitle: '🚀 to fluency and beyond',
        completeEmoji: '🚀',
        completeMessage: 'Blast off!',
        buttonRadius: '20px',
        checkButtonText: 'Launch',
        restartButtonText: 'Explore a new galaxy',
        showAnswerButtonText: 'Send distress signal',
        revealMessageInflectional: `Earth to learner: the answer you're looking for is: `,
        revealMessageTranslation: `Earth to learner: the translation you're looking for is: `,
        perfectEvalMessage: 'You\'ve landed among the stars!',
        goodEvalMessage: 'A successful launch!',
        okayEvalMessage: 'Thrusters warming up!',
        failEvalMessage: 'Failure to launch... want to try again?',
        themeIcon: '🪐',
        cursor: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'48\' viewport=\'0 0 100 100\' style=\'fill:black;font-size:24px;\'><text y=\'50%\'>🛸</text></svg>") 16 0, auto'
      },
      horror: {
        background: 'linear-gradient(135deg, #1a0f0f 0%,rgb(151, 3, 3) 100%)',
        cardBorder: 'linear-gradient(90deg, #8B0000 0%, #FF0000 100%)',
        primary: '#c41e3a',
        secondary: '#8B0000',
        accent: '#FF0000',
        accentHover: '#DC143C',
        progressBg: 'rgba(139, 0, 0, 0.2)',
        progressBar: '#FF0000',
        correct: '#39FF14',
        incorrect: '#FF0000',
        subtitle: '🩸 learn or die trying',
        completeEmoji: '🧟',
        completeMessage: 'You Survived... For Now',
        buttonRadius: '0px', 
        checkButtonText: 'Face Your Fate',
        restartButtonText: 'Tempt Death Again',
        showAnswerButtonText: 'Succumb',
        revealMessageInflectional: `The blood on the wall spells: the answer is `,
        revealMessageTranslation: `The blood on the wall spells: the translation is `,
        perfectEvalMessage: 'You made it out alive!',
        goodEvalMessage: 'By the skin of your teeth!',
        okayEvalMessage: 'Survival skills improving!',
        failEvalMessage: 'Ouch, you got got... resurrect and try again?',
        themeIcon: '💀',
        cursor: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'48\' viewport=\'0 0 100 100\' style=\'fill:black;font-size:24px;\'><text y=\'50%\'>🔪</text></svg>") 16 0, auto'
      }
  };