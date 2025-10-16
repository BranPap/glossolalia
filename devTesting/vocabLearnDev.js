function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function displayUpdatedTermScores(termScores) {
  for (const [term, scores] of Object.entries(termScores)) {
    console.log(`Term: ${term}`);
    for (const [lang, data] of Object.entries(scores)) {
      const percent = data.seen > 0 ? ((data.correct / data.seen) * 100).toFixed(2) : '0.00';
      console.log(`  Language: ${lang}, Seen: ${data.seen}, Correct: ${data.correct}, Percent: ${percent}%`);
    }   
}
}

const determineCompetitors = (possibilities, correctAnswer, n = 1, lang = currentLanguage) => {
  const allCompetitors = possibilities.filter(item => item.data[lang]['translation'] !== correctAnswer);
  const selectedCompetitors = [];

  for (let i = 0; i < n; i++) {
    if (allCompetitors.length === 0) break;

    const randomIndex = Math.floor(Math.random() * allCompetitors.length);
    const competitor = allCompetitors.splice(randomIndex, 1)[0];
    selectedCompetitors.push(competitor.data[lang]['translation']);
  }

  return selectedCompetitors;
};

function grabSlice(arr, n1, n2) {
  return arr.slice(n1, n2);
}

let baseLanguage = getQueryParam("lang") || "English"; 
let targetLanguage = getQueryParam("target") || "Spanish";
let currentTopic = getQueryParam("topic") || "animals";

let filteredData = (nounVocav[currentTopic].filter(item => item.data[targetLanguage] && item.data[baseLanguage]));
filteredData = shuffleArray(filteredData);
filteredData = filteredData.slice(0,5)


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
  currentTerms : shuffleArray(filteredData),
  firstPair : grabSlice(filteredData, 0, 2),
  secondPair : grabSlice(filteredData, 2, 4),
  fifthWord : grabSlice(filteredData, 4, 5),
}

gameState.termScores = {};

gameState.currentTerms.forEach(term => {
  const key = term.entry; 
  // console.log(key);
  gameState.termScores[key] = gameState.termScores[key] || {};
  gameState.termScores[key][targetLanguage] = { seen: 0, correct: 0 };
});


const generateGameLoop = (baseLanguage, targetLanguage, topic, wordList) => {
  let loopTimeline = [];

  gameState.currentTerms = shuffleArray(wordList);
  gameState.firstPair = grabSlice(gameState.currentTerms, 0, 2);
  gameState.secondPair = grabSlice(gameState.currentTerms, 2, 4);
  gameState.fifthWord = grabSlice(gameState.currentTerms, 4, 5);
  gameState.score = 0;
  gameState.total = 0;

  var preloadBlock = {
    type: jsPsychPreload,
    images: function() {
      return gameState.currentTerms.map(item => item.image);
    }
  }
  
  loopTimeline.push(preloadBlock);

  
  var learningBlockOne = {
    timeline: [
      {
        type: jsPsychSimpleImageButtonResponse,
        stimulus: function() {
          return jsPsych.timelineVariable('image');
        },
        choices: ["Continue"],
        prompt: function() {
          let data = jsPsych.timelineVariable('data');
          return `<h1>${data[targetLanguage]['translation']}</h1>
                  <p>(${data[baseLanguage]['translation']})</p>`;
        }
      }
    ],
    timeline_variables: gameState.firstPair,
    randomize_order: true
  };

  loopTimeline.push(learningBlockOne);

  const morphBlock = {
    timeline: [
      {
        type: jsPsychMorphBank,
        prompt: function() {
          let data = jsPsych.timelineVariable('data');
          return `<h1>${data[baseLanguage]['translation']}</h1><br>`;
        },
        stimulus: function() {
          return jsPsych.timelineVariable('image')
        },
        morphemes: function() {
          let data = jsPsych.timelineVariable('data');
          return data[targetLanguage]['morph'];
        },
        on_finish: function(data) {
          let dataVar = jsPsych.timelineVariable('data');

          let key = dataVar['English']['translation'];


          // Update counters
          gameState.total += 1;
          gameState.termScores[key][targetLanguage]['seen'] += 1; 
          
          if (data.isCorrect) {
            gameState.score += 1;
            gameState.termScores[key][targetLanguage]['correct'] += 1;
          }

          // For debugging: display updated term scores in console
          displayUpdatedTermScores(gameState.termScores);
          console.log(gameState.total, gameState.score);
        }
      }
    ],
    timeline_variables: gameState.firstPair,
    randomize_order: true
  }

  loopTimeline.push(morphBlock);

  var afcBlockOne = {
    timeline: [
      {
        type: jsPsychSimpleImageButtonResponse,
        stimulus: function() {
          return jsPsych.timelineVariable('image')
        },
        choices: function() {
          let data = jsPsych.timelineVariable('data');
          let correctAnswer = data[targetLanguage]['translation'];
          let competitor = determineCompetitors(gameState.firstPair, correctAnswer, 1, targetLanguage)[0];
          return shuffleArray([correctAnswer, competitor]);
        },
        prompt: function() {
          let data = jsPsych.timelineVariable('data');
          return `<h1>${data[baseLanguage]['translation']}</h1>`;
        },
        correct_choice: function() {
          let data = jsPsych.timelineVariable('data');
          return data[targetLanguage]['translation'];
        },
        on_finish: function(data) {
          let dataVar = jsPsych.timelineVariable('data');
          let key = dataVar['English']['translation'];

          // Update counters
          if (data.response === this.correct_choice) {
            data.correct = true; 
          } else {
            data.correct = false;
          }

          gameState.total += 1;
          gameState.termScores[key][targetLanguage]['seen'] += 1; 
          
          let selectedChoice = data.response;
          console.log(selectedChoice);

          let selectedEnglish = gameState.currentTerms.find(item => item.data[targetLanguage]['translation'] === selectedChoice)['data']['English']['translation'];

          if (data.correct) {
            gameState.score += 1;
            gameState.termScores[key][targetLanguage]['correct'] += 1;
          } else {
            gameState.termScores[selectedEnglish][targetLanguage]['seen'] += 1;
          }

          // For debugging: display updated term scores in console
          displayUpdatedTermScores(gameState.termScores);
          console.log(gameState.total, gameState.score);
        }
      }
    ],
    timeline_variables: gameState.firstPair,
    randomize_order: true
  };

  loopTimeline.push(afcBlockOne);

  const morphBlock2 = {
    timeline: [
      {
        type: jsPsychMorphBank,
        prompt: function() {
          let data = jsPsych.timelineVariable('data');
          return `<h1>${data[baseLanguage]['translation']}</h1><br>`;
        },
        stimulus: function() {
          return jsPsych.timelineVariable('image')
        },
        morphemes: function() {
          let data = jsPsych.timelineVariable('data');
          return data[targetLanguage]['morph'];
        },
        distractor_morphemes: function() {
          let data = jsPsych.timelineVariable('data');
          let correctAnswer = data[targetLanguage]['translation'];
          let competitor = determineCompetitors(gameState.firstPair, correctAnswer, 1, targetLanguage)[0];
          let competitorData = gameState.firstPair.find(item => item.data[targetLanguage]['translation'] === competitor);
          return competitorData ? competitorData['data'][targetLanguage]['morph'] : [];
        },
        on_finish: function(data) {
          let dataVar = jsPsych.timelineVariable('data');
          let key = dataVar['English']['translation'];
          gameState.total += 1;
          gameState.termScores[key][targetLanguage]['seen'] += 1; 

          if (data.isCorrect) {
            gameState.score += 1;
            gameState.termScores[key][targetLanguage]['correct'] += 1; 
            
          } else {
            // If incorrect, mark every distractor word that contains the selected morphemes as seen
            let selectedMorphemes = data.response;
            gameState.firstPair.forEach(item => {
              if (item.data[targetLanguage]['morph'].some(m => selectedMorphemes.includes(m))) {
                gameState.termScores[item.entry][targetLanguage]['seen'] += 1;
              }
            });
          }

          // For debugging: display updated term scores in console
          displayUpdatedTermScores(gameState.termScores);
          console.log(gameState.total, gameState.score);
        }
      }
    ],
    timeline_variables: gameState.firstPair,
    randomize_order: true
  }

  loopTimeline.push(morphBlock2);

  var typingBlockOne = {
    timeline: [
      {
        type: jsPsychSimpleImageClozeResponse,
        stimulus: function() {
          return jsPsych.timelineVariable('image')
        },
        prompt: function() {
          let data = jsPsych.timelineVariable('data');
          return `<h1>${data[baseLanguage]['translation']}</h1>
                  <p>Type the word in <strong>${targetLanguage}</strong>.</p>`;
        },
        correct_response: function() {
          let data = jsPsych.timelineVariable('data');
          return data[targetLanguage]['translation'];
        },
        on_finish: function(data) {
          let dataVar = jsPsych.timelineVariable('data');
          let key = dataVar['English']['translation'];
          gameState.total += 1;
          gameState.termScores[key][targetLanguage]['seen'] += 1; 
          if (data.response.toLowerCase() === this.correct_response.toLowerCase()) {
            gameState.score += 1;
            data.correct = true;
            gameState.termScores[key][targetLanguage]['correct'] += 1; 
          } 

          // For debugging: display updated term scores in console
          displayUpdatedTermScores(gameState.termScores);
          console.log(gameState.total, gameState.score);
        }
      }
    ],
    timeline_variables: gameState.firstPair,
    randomize_order: true
  }

  loopTimeline.push(typingBlockOne);


  var learningBlockTwo = {
    timeline: [
      {
        type: jsPsychSimpleImageButtonResponse,
        stimulus: function() {
          return jsPsych.timelineVariable('image');
        },
        choices: ["Continue"],
        prompt: function() {
          let data = jsPsych.timelineVariable('data');
          return `<h1>${data[targetLanguage]['translation']}</h1>
                  <p>(${data[baseLanguage]['translation']})</p>`;
        }
      }
    ],
    timeline_variables: gameState.secondPair,
    randomize_order: true
  };

  loopTimeline.push(learningBlockTwo);

  const morphBlock2dot1 = {
    timeline: [
      {
        type: jsPsychMorphBank,
        prompt: function() {
          let data = jsPsych.timelineVariable('data');
          return `<h1>${data[baseLanguage]['translation']}</h1><p>Build the word in <strong>${targetLanguage}</strong> by placing the segments in the right order.</p>`;
        },
        stimulus: function() {
          return jsPsych.timelineVariable('image')
        },
        morphemes: function() {
          let data = jsPsych.timelineVariable('data');
          return data[targetLanguage]['morph'];
        },
        on_finish: function(data) {
          let dataVar = jsPsych.timelineVariable('data');
          let key = dataVar['English']['translation'];
          gameState.total += 1;
          gameState.termScores[key][targetLanguage]['seen'] += 1; 

          if (data.isCorrect) {
            gameState.score += 1;
            gameState.termScores[key][targetLanguage]['correct'] += 1; 
            
          }

          // For debugging: display updated term scores in console
          displayUpdatedTermScores(gameState.termScores);
          console.log(gameState.total, gameState.score);
        }
      }
    ],
    timeline_variables: gameState.secondPair,
    randomize_order: true
  }

  loopTimeline.push(morphBlock2dot1);

  var afcBlockTwo = {
    timeline: [
      {
        type: jsPsychSimpleImageButtonResponse,
        stimulus: function() {
          return jsPsych.timelineVariable('image')
        },
        choices: function() {
          let data = jsPsych.timelineVariable('data');
          let correctAnswer = data[targetLanguage]['translation'];
          let competitor = determineCompetitors(gameState.secondPair, correctAnswer, 1, targetLanguage)[0];
          return shuffleArray([correctAnswer, competitor]);
        },
        prompt: function() {
          let data = jsPsych.timelineVariable('data');
          return `<h1>${data[baseLanguage]['translation']}</h1>`;
        },
        correct_choice: function() {
          let data = jsPsych.timelineVariable('data');
          return data[targetLanguage]['translation'];
        },
        on_finish: function(data) {
          let dataVar = jsPsych.timelineVariable('data');
          let key = dataVar['English']['translation'];

          // Update counters
          if (data.response === this.correct_choice) {
            data.correct = true; 
          } else {
            data.correct = false;
          }

          gameState.total += 1;
          gameState.termScores[key][targetLanguage]['seen'] += 1; 
          
          let selectedChoice = data.response;
          console.log(selectedChoice);

          let selectedEnglish = gameState.currentTerms.find(item => item.data[targetLanguage]['translation'] === selectedChoice)['data']['English']['translation'];

          if (data.correct) {
            gameState.score += 1;
            gameState.termScores[key][targetLanguage]['correct'] += 1;
          } else {
            gameState.termScores[selectedEnglish][targetLanguage]['seen'] += 1;
          }

          // For debugging: display updated term scores in console
          displayUpdatedTermScores(gameState.termScores);
          console.log(gameState.total, gameState.score);
        }
        // on_finish: function(data) {
        //   if (data.response === this.correct_choice) {
        //     data.correct = true;
        //   } else {
        //     data.correct = false;
        //   }
        //   gameState.total += 1;
        //   let dataVar = jsPsych.timelineVariable('data');
        //   let key = dataVar['English']['translation'];
        //   gameState.termScores[key][targetLanguage]['seen'] += 1; 

        //   let selectedChoice = data.response;

        //   let selectedEnglish = gameState.currentTerms.find(item => item.data[targetLanguage]['translation'] === selectedChoice)['data']['English']['translation'];
  
        //   if (data.isCorrect) {
        //       gameState.score += 1;
        //       gameState.termScores[key][targetLanguage]['correct'] += 1; 
        //     } else {
        //       gameState.termScores[selectedEnglish][targetLanguage]['seen'] += 1;
        //     }
        //     // For debugging: display updated term scores in console
        //   dis
        }
    ],
    timeline_variables: gameState.secondPair,
    randomize_order: true
  };

  loopTimeline.push(afcBlockTwo);

  const morphBlock2dot2 = {
    timeline: [
      {
        type: jsPsychMorphBank,
        prompt: function() {
          let data = jsPsych.timelineVariable('data');
          return `<h1>${data[baseLanguage]['translation']}</h1><p>Build the word in <strong>${targetLanguage}</strong> by placing the segments in the right order.</p>`;
        },
        stimulus: function() {
          return jsPsych.timelineVariable('image')
        },
        morphemes: function() {
          let data = jsPsych.timelineVariable('data');
          return data[targetLanguage]['morph'];
        },
        distractor_morphemes: function() {
          let data = jsPsych.timelineVariable('data');
          let correctAnswer = data[targetLanguage]['translation'];
          let competitor = determineCompetitors(gameState.secondPair, correctAnswer, 1, targetLanguage)[0];
          let competitorData = gameState.secondPair.find(item => item.data[targetLanguage]['translation'] === competitor);
          return competitorData ? competitorData['data'][targetLanguage]['morph'] : [];
        },
        on_finish: function(data) {
          let dataVar = jsPsych.timelineVariable('data');
          let key = dataVar['English']['translation'];
          gameState.total += 1;
          gameState.termScores[key][targetLanguage]['seen'] += 1; 

          if (data.isCorrect) {
            gameState.score += 1;
            gameState.termScores[key][targetLanguage]['correct'] += 1; 
            
          } else {
            // If incorrect, mark every distractor word that contains the selected morphemes as seen
            let selectedMorphemes = data.response;
            gameState.secondPair.forEach(item => {
              if (item.data[targetLanguage]['morph'].some(m => selectedMorphemes.includes(m))) {
                gameState.termScores[item.entry][targetLanguage]['seen'] += 1;
              }
            });
          }
          // For debugging: display updated term scores in console
          displayUpdatedTermScores(gameState.termScores);
          console.log(gameState.total, gameState.score);
        }
      }
    ],
    timeline_variables: gameState.secondPair,
    randomize_order: true
  }

  loopTimeline.push(morphBlock2dot2);

  var typingBlockTwo = {
    timeline: [
      {
        type: jsPsychSimpleImageClozeResponse,
        stimulus: function() {
          return jsPsych.timelineVariable('image')
        },
        prompt: function() {
          let data = jsPsych.timelineVariable('data');
          return `<h1>${data[baseLanguage]['translation']}</h1>
                  <p>Type the word in <strong>${targetLanguage}</strong>.</p>`;
        },
        correct_response: function() {
          let data = jsPsych.timelineVariable('data');
          return data[targetLanguage]['translation'];
        },
        on_finish: function(data) {
          let dataVar = jsPsych.timelineVariable('data');
          let key = dataVar['English']['translation'];
          gameState.total += 1;
          gameState.termScores[key][targetLanguage]['seen'] += 1; 
          if (data.response.toLowerCase() === this.correct_response.toLowerCase()) {
            gameState.score += 1;
            data.correct = true;
            gameState.termScores[key][targetLanguage]['correct'] += 1; 
          } 
          // For debugging: display updated term scores in console
          displayUpdatedTermScores(gameState.termScores);
          console.log(gameState.total, gameState.score);
        }
      }
    ],
    timeline_variables: gameState.secondPair,
    randomize_order: true
  }

  loopTimeline.push(typingBlockTwo);

  var afcBlockThree = {
    timeline: [
      {
        type: jsPsychSimpleImageButtonResponse,
        stimulus: function() {
          return jsPsych.timelineVariable('image')
        },
        choices: function() {
          let data = jsPsych.timelineVariable('data');
          let correctAnswer = data[targetLanguage]['translation'];
          let competitors = determineCompetitors(gameState.currentTerms, correctAnswer, 3, targetLanguage);
          return shuffleArray([correctAnswer, ... competitors]);
        },
        prompt: function() {
          let data = jsPsych.timelineVariable('data');
          return `<h1>${data[baseLanguage]['translation']}</h1>`;
        },
        correct_choice: function() {
          let data = jsPsych.timelineVariable('data');
          return data[targetLanguage]['translation'];
        },
        on_finish: function(data) {
          let dataVar = jsPsych.timelineVariable('data');
          let key = dataVar['English']['translation'];

          // Update counters
          if (data.response === this.correct_choice) {
            data.correct = true; 
          } else {
            data.correct = false;
          }

          gameState.total += 1;
          gameState.termScores[key][targetLanguage]['seen'] += 1; 
          
          let selectedChoice = data.response;
          console.log(selectedChoice);

          let selectedEnglish = gameState.currentTerms.find(item => item.data[targetLanguage]['translation'] === selectedChoice)['data']['English']['translation'];

          if (data.correct) {
            gameState.score += 1;
            gameState.termScores[key][targetLanguage]['correct'] += 1;
          } else {
            gameState.termScores[selectedEnglish][targetLanguage]['seen'] += 1;
          }

          // For debugging: display updated term scores in console
          displayUpdatedTermScores(gameState.termScores);
          console.log(gameState.total, gameState.score);
        }
      }
    ],
    timeline_variables: gameState.currentTerms,
    randomize_order: true
  };

  loopTimeline.push(afcBlockThree);

  var end = {
    type: jsPsychHtmlButtonResponse,
    choices: ["Home", "Repeat Words", "Shuffle Words"],
    stimulus: function() {

      let data = gameState.currentTerms;

      return `
  <div class="gloss-block-complete">
    <h2>Practice complete!</h2>
    <p>Your score: 
      <span class="gloss-score">${gameState.score}</span> out of 
      <span class="gloss-total">${gameState.total}</span> 
      (<span class="gloss-percent">${((gameState.score / gameState.total) * 100).toFixed(2)}%</span>)
    </p>
    
    <p><strong>Word mastery:</strong></p>
<ul class="gloss-word-list">
  ${data
    .sort((a, b) => {
      const getPercent = item => {
        const key = item.entry;
        const termData = gameState.termScores[key][targetLanguage];
        return termData && termData.seen > 0
          ? (termData.correct / termData.seen) * 100
          : 0;
      };
      return getPercent(b) - getPercent(a); 
    })

    .map(item => {
      const key = item.entry;
      const termData = gameState.termScores[key][targetLanguage];
      const termPercent = termData && termData.seen > 0
        ? ((termData.correct / termData.seen) * 100).toFixed(2)
        : '0.00';
      
      const stars =
        termPercent === '100.00' ? '⭐️⭐️⭐️⭐️⭐️' :
        termPercent >= 80 ? '⭐️⭐️⭐️⭐️' :
        termPercent >= 60 ? '⭐️⭐️⭐️' :
        termPercent >= 40 ? '⭐️⭐️' : '⭐️';

      return `
        <li class="gloss-word-item">
          <span class="gloss-word-foreign"><strong>${item.data[targetLanguage]['translation']}</strong></span> 
          <span class="gloss-word-native">(${item.data[baseLanguage]['translation']})</span>  
          <span class="gloss-stars">${stars}</span>
        </li>
      `;
    })
    .join('')}
</ul>


    <p class="gloss-next">What would you like to do next?</p>
    <p class="gloss-note"><em>Selecting "Home" will take you back to the Glossolalia homepage.</em></p> 
  </div>
`;
    },
    on_finish: function(data) {
      if (data.response === 0) {
        window.location.href = "index.html";
      } else if (data.response === 1) {
        let newBlock = generateGameLoop(baseLanguage, targetLanguage, currentTopic, filteredData);
        jsPsych.addNodeToEndOfTimeline({ timeline: newBlock });
      } else if (data.response === 2) {
        let filteredData = (nounVocav[currentTopic].filter(item => item.data[targetLanguage] && item.data[baseLanguage]));
        filteredData = filteredData.slice(0,4)
        let newBlock = generateGameLoop(baseLanguage, targetLanguage, currentTopic, filteredData);
        jsPsych.addNodeToEndOfTimeline({ timeline: newBlock });
      }
    }
  };
  loopTimeline.push(end);


  
  return loopTimeline;

}

// ------------------------
// Opening Screen
// ------------------------

var welcomeSlide = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `<h1>Welcome to Glossolalia!</h1><br>
             <p>You are currently learning animal names in <strong>${targetLanguage}</strong>.</p>`,
  choices: ["Begin"]
};

timeline.push(welcomeSlide);



firstBlock = generateGameLoop(baseLanguage, targetLanguage, currentTopic, filteredData);
timeline.push(...firstBlock);

// ------------------------
// Start the experiment
// ------------------------
jsPsych.run(timeline);