function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const determineCompetitors = (possibilities, correctAnswer, n = 1, lang = currentLanguage) => {
  const allCompetitors = possibilities.filter(item => item[lang] !== correctAnswer);
  const selectedCompetitors = [];

  for (let i = 0; i < n; i++) {
    if (allCompetitors.length === 0) break;

    const randomIndex = Math.floor(Math.random() * allCompetitors.length);
    const competitor = allCompetitors.splice(randomIndex, 1)[0];
    selectedCompetitors.push(competitor[lang]);
  }

  return selectedCompetitors;
};

let currentLanguage = getQueryParam("lang") || "English"; 
let currentTopic = getQueryParam("topic") || "animals";

let filteredLanguage = shuffleArray(nounVocab[currentTopic]).filter(item => item[currentLanguage]);
filteredLanguage = filteredLanguage.slice(0,4)

function grabSlice(arr, n1, n2) {
  return arr.slice(n1, n2);
}

// ------------------------
// Initialize jsPsych
// ------------------------
const jsPsych = initJsPsych({
    show_progress_bar: false,
    auto_update_progress_bar: false,
    on_finish: function () {
      console.log("Experiment finished");
      // jsPsych.data.displayData('csv');
    }
  });
  
// Main timeline
let timeline = [];

const gameState = {
  score : 0,
  total : 0,
  currentTerms : shuffleArray(filteredLanguage),
  firstPair : grabSlice(filteredLanguage, 0, 2),
  secondPair : grabSlice(filteredLanguage, 2, 4),
  termScore : {
    0: 0,
    1: 0,
    2: 0
  }
}

const generateGameLoop = (language, topic, wordList) => {
  let loopTimeline = [];

  gameState.currentTerms = shuffleArray(wordList);
  gameState.firstPair = grabSlice(gameState.currentTerms, 0, 2);
  gameState.secondPair = grabSlice(gameState.currentTerms, 2, 4);
  gameState.score = 0;
  gameState.total = 0;

  var learningBlockOne = {
    timeline: [
      {
        type: jsPsychSimpleImageButtonResponse,
        stimulus: function() {
          return jsPsych.timelineVariable('image');
        },
        choices: ["Continue"],
        prompt: function() {
          return `<h1>${jsPsych.timelineVariable(language)}</h1>
                  <p>(${jsPsych.timelineVariable('English')})</p>`;
        }
      }
    ],
    timeline_variables: gameState.firstPair,
    randomize_order: true
  };

  loopTimeline.push(learningBlockOne);

  var afcBlockOne = {
    timeline: [
      {
        type: jsPsychSimpleImageButtonResponse,
        stimulus: function() {
          return jsPsych.timelineVariable('image')
        },
        choices: function() {
          const correctAnswer = jsPsych.timelineVariable(language);
          const competitor = determineCompetitors(gameState.firstPair, correctAnswer, 1, language)[0];
          return shuffleArray([correctAnswer, competitor]);
        },
        prompt: function() {
          return `<h1>${jsPsych.timelineVariable('English')}</h1>`;
        },
        correct_choice: function() {
          return jsPsych.timelineVariable(language)
        },
        on_finish: function(data) {
          if (data.response === this.correct_choice) {
            data.correct = true;
          } else {
            data.correct = false;
          }
          gameState.total += 1;
          if (data.correct) {
            gameState.score += 1;
          }
        }
      }
    ],
    timeline_variables: gameState.firstPair,
    randomize_order: true
  };

  loopTimeline.push(afcBlockOne);

  var learningBlockTwo = {
    timeline: [
      {
        type: jsPsychSimpleImageButtonResponse,
        stimulus: function() {
          return jsPsych.timelineVariable('image');
        },
        choices: ["Continue"],
        prompt: function() {
          return `<h1>${jsPsych.timelineVariable(language)}</h1>
                  <p>(${jsPsych.timelineVariable('English')})</p>`;
        }
      }
    ],
    timeline_variables: gameState.secondPair,
    randomize_order: true
  };

  loopTimeline.push(learningBlockTwo);

  var afcBlockTwo = {
    timeline: [
      {
        type: jsPsychSimpleImageButtonResponse,
        stimulus: function() {
          return jsPsych.timelineVariable('image')
        },
        choices: function() {
          const correctAnswer = jsPsych.timelineVariable(language);
          const competitor = determineCompetitors(gameState.secondPair, correctAnswer, 1, language)[0];
          return shuffleArray([correctAnswer, competitor]);
        },
        prompt: function() {
          return `<h1>${jsPsych.timelineVariable('English')}</h1>`;
        },
        correct_choice: function() {
          return jsPsych.timelineVariable(language)
        },
        on_finish: function(data) {
          if (data.response === this.correct_choice) {
            data.correct = true;
          } else {
            data.correct = false;
          }
          gameState.total += 1;
          if (data.correct) {
            gameState.score += 1;
          }
        }
      }
    ],
    timeline_variables: gameState.secondPair,
    randomize_order: true
  };

  loopTimeline.push(afcBlockTwo);

  const morphBlock = {
    timeline: [
      {
        type: jsPsychMorphBank,
        prompt: function() {
          return `<h1>${jsPsych.timelineVariable('English')}</h1><p>Build the word in <strong>${currentLanguage}</strong> by placing the segments in the right order.</p>`;
        },
        stimulus: function() {
          return jsPsych.timelineVariable('image')
        },
        morphemes: function() {
          return jsPsych.timelineVariable(`${currentLanguage}Morph`)
        },
        on_finish: function(data) {
          gameState.total += 1;
          if (data.isCorrect) {
            gameState.score += 1;
          }
        }
      }
    ],
    timeline_variables: gameState.currentTerms,
    randomize_order: true
  }

  loopTimeline.push(morphBlock);

  var end = {
    type: jsPsychHtmlButtonResponse,
    choices: ["Home", "Repeat Words", "Shuffle Words"],
    stimulus: function() {
      return `<h1>End of practice session</h1>
               <p>Your score: ${gameState.score} out of ${gameState.total} 
               (${((gameState.score/gameState.total)*100).toFixed(2)}%)</p>
               <p>You can go back to the home page, repeat the same words, or shuffle and try new words.</p>`;
    },
    on_finish: function(data) {
      if (data.response === 0) {
        window.location.href = "index.html";
      } else if (data.response === 1) {
        const newBlock = generateGameLoop(currentLanguage, currentTopic, filteredLanguage);
        jsPsych.addNodeToEndOfTimeline({ timeline: newBlock });
      } else if (data.response === 2) {
        filteredLanguage = shuffleArray(nounVocab[currentTopic]).filter(item => item[currentLanguage]);
        filteredLanguage = filteredLanguage.slice(0,4)
        const newBlock = generateGameLoop(currentLanguage, currentTopic, filteredLanguage);
        jsPsych.addNodeToEndOfTimeline({ timeline: newBlock });
      }
    }
  };
  loopTimeline.push(end);

  
  return loopTimeline;

}

// ------------------------
// Final Screen
// ------------------------


var welcomeSlide = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `<h1>Welcome to Glossolalia!</h1><br>
             <p>You are currently learning animal names in <strong>${currentLanguage}</strong>.</p>`,
  choices: ["Begin"]
};

timeline.push(welcomeSlide);

firstBlock = generateGameLoop(currentLanguage, currentTopic, filteredLanguage);
timeline.push(...firstBlock);

// ------------------------
// Start the experiment
// ------------------------
jsPsych.run(timeline);
