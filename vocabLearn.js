function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// ------------------------
// Utilities
// ------------------------

function displayUpdatedTermScores(termScores) {
  for (const [term, scores] of Object.entries(termScores)) {
    console.log(`Term: ${term}`);
    for (const [lang, data] of Object.entries(scores)) {
      const percent = data.seen > 0 ? ((data.correct / data.seen) * 100).toFixed(2) : '0.00';
      console.log(`  Language: ${lang}, Seen: ${data.seen}, Correct: ${data.correct}, Percent: ${percent}%`);
    }
  }
}

function updateProgressBar() {
  currentTrial++;
  const progress = currentTrial / totalTrials;
  jsPsych.setProgressBar(progress);
}

function determineCompetitors(possibilities, correctAnswer, n = 1, lang = currentLanguage) {
  const allCompetitors = possibilities.filter(item => item.data[lang]['translation'] !== correctAnswer);
  const selectedCompetitors = [];

  for (let i = 0; i < n && allCompetitors.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * allCompetitors.length);
    const competitor = allCompetitors.splice(randomIndex, 1)[0];
    selectedCompetitors.push(competitor.data[lang]['translation']);
  }

  return selectedCompetitors;
}

function grabSlice(arr, n1, n2) {
  return arr.slice(n1, n2);
}

function updateScore(gameState, key, lang, isCorrect) {
  gameState.total++;
  gameState.termScores[key][lang].seen++;
  if (isCorrect) {
    gameState.score++;
    gameState.termScores[key][lang].correct++;
  }
  displayUpdatedTermScores(gameState.termScores);
  console.log(gameState.total, gameState.score);
}

function initTermScores(gameState, wordList, lang) {
  gameState.termScores = {};
  wordList.forEach(term => {
    const key = term.entry;
    gameState.termScores[key] = gameState.termScores[key] || {};
    gameState.termScores[key][lang] = { seen: 0, correct: 0 };
  });
}

// ------------------------
// Setup
// ------------------------

let baseLanguage = getQueryParam("lang") || "English"; 
let targetLanguage = getQueryParam("target") || "Spanish";
let currentTopic = getQueryParam("topic") || "animals";

let filteredData = nounVocav[currentTopic]
  .filter(item => item.data[targetLanguage] && item.data[baseLanguage]);
filteredData = shuffleArray(filteredData).slice(0, 4);

const jsPsych = initJsPsych({
  show_progress_bar: true,
  auto_update_progress_bar: false,
  on_trial_start: () => {
    currentTrial++;
    jsPsych.setProgressBar(currentTrial / totalTrials);
  }
});

let timeline = [];

const gameState = {
  score: 0,
  total: 0,
  currentTerms: shuffleArray(filteredData),
};

initTermScores(gameState, gameState.currentTerms, targetLanguage);

gameState.firstPair = grabSlice(gameState.currentTerms, 0, 2);
gameState.secondPair = grabSlice(gameState.currentTerms, 2, 4);
// gameState.fifthWord = grabSlice(gameState.currentTerms, 4, 5);

// ------------------------
// Block Generators
// ------------------------

function makeLearningBlock(pairs, baseLang, targetLang) {
  return {
    timeline: [{
      type: jsPsychSimpleImageButtonResponse,
      stimulus: () => jsPsych.timelineVariable('image'),
      choices: ["Continue"],
      prompt: () => {
        const data = jsPsych.timelineVariable('data');
        return `<h1>${data[targetLang]['translation']}</h1>
                <p>(${data[baseLang]['translation']})</p>`;
      }
    }],
    timeline_variables: pairs,
    randomize_order: true
  };
}

function makeMorphBlock(pairs, gameState, targetLang, baseLang, withDistractors = false) {
  return {
    timeline: [{
      type: jsPsychMorphBank,
      prompt: () => {
        const data = jsPsych.timelineVariable('data');
        return `<h1>${data[baseLang]['translation']}</h1><br>`;
      },
      stimulus: () => jsPsych.timelineVariable('image'),
      morphemes: () => jsPsych.timelineVariable('data')[targetLang]['morph'],
      distractor_morphemes: withDistractors ? () => {
        const data = jsPsych.timelineVariable('data');
        const correctAnswer = data[targetLang]['translation'];
        const competitor = determineCompetitors(pairs, correctAnswer, 1, targetLang)[0];
        const competitorData = pairs.find(item => item.data[targetLang]['translation'] === competitor);
        return competitorData ? competitorData.data[targetLang]['morph'] : [];
      } : undefined,
      on_finish: (data) => {
        const dataVar = jsPsych.timelineVariable('data');
        const key = dataVar['English']['translation'];
        updateScore(gameState, key, targetLang, data.isCorrect);

        if (!data.isCorrect && withDistractors) {
          const selectedMorphemes = data.response;
          pairs.forEach(item => {
            if (item.data[targetLang]['morph'].some(m => selectedMorphemes.includes(m))) {
              gameState.termScores[item.entry][targetLang].seen++;
            }
          });
        }
      }
    }],
    timeline_variables: pairs,
    randomize_order: true
  };
}

function makeAfcBlock(pairs, gameState, targetLang, baseLang, nComp = 1) {
  return {
    timeline: [{
      type: jsPsychSimpleImageButtonResponse,
      stimulus: () => jsPsych.timelineVariable('image'),
      choices: () => {
        const data = jsPsych.timelineVariable('data');
        const correctAnswer = data[targetLang]['translation'];
        const competitors = determineCompetitors(pairs, correctAnswer, nComp, targetLang);
        return shuffleArray([correctAnswer, ...competitors]);
      },
      prompt: () => `<h1>${jsPsych.timelineVariable('data')[baseLang]['translation']}</h1>`,
      correct_choice: () => {
        const data = jsPsych.timelineVariable('data');
        return data[targetLang]['translation'];
      },
      on_finish: (data) => {
        const dataVar = jsPsych.timelineVariable('data');
        const key = dataVar['English']['translation'];
        const correctAnswer = dataVar[targetLang]['translation'];
        const isCorrect = data.response === correctAnswer;

        updateScore(gameState, key, targetLang, isCorrect);

        if (!isCorrect) {
          const selectedChoice = data.response;
          const selectedTerm = gameState.currentTerms.find(item =>
            item.data[targetLang]['translation'] === selectedChoice);
          if (selectedTerm) {
            gameState.termScores[selectedTerm.entry][targetLang].seen++;
          }
        }
      }
    }],
    timeline_variables: pairs,
    randomize_order: true
  };
}

function makeTypingBlock(pairs, gameState, targetLang, baseLang) {
  return {
    timeline: [{
      type: jsPsychSimpleImageClozeResponse,
      stimulus: () => jsPsych.timelineVariable('image'),
      prompt: () => {
        const data = jsPsych.timelineVariable('data');
        return `<h1>${data[baseLang]['translation']}</h1>
                <p>Type the word in <strong>${targetLang}</strong>.</p>`;
      },
      correct_response: () => jsPsych.timelineVariable('data')[targetLang]['translation'],
      on_finish: (data) => {
        const dataVar = jsPsych.timelineVariable('data');
        const key = dataVar['English']['translation'];
        const correctAnswer = dataVar[targetLang]['translation'];
        const isCorrect = data.response.toLowerCase() === correctAnswer.toLowerCase();
        updateScore(gameState, key, targetLang, isCorrect);
      }
    }],
    timeline_variables: pairs,
    randomize_order: true
  };
}

function makeMatchGridBlock(pairs, gameState, targetLang, baseLang, nRows = 2, nCols = 4) {
  return {
    timeline: [{
      type: jsPsychMatchGrid,
      cards: () => pairs.map(item => ({
        entry: item.entry,
        image: item.image,
        translation: item.data[targetLang]['translation']
      })),
      n_cols: 4,
      n_rows: 2,
      post_game_buttons: ['Continue'],
      on_finish: (data) => {
        const response = data.response;
        if (response === 'Continue') {
          console.log("Continue clicked, moving to next block...");
        }
      },
      timeline_variables: pairs,
      randomize_order: true
    }]
  };
}

// ------------------------
// Game Loop Generator
// ------------------------

function generateGameLoop(baseLang, targetLang, topic, wordList) {
  const loop = [];

  gameState.currentTerms = shuffleArray(wordList.filter(item => item.data[targetLang] && item.data[baseLang])).slice(0, 4);
  gameState.firstPair = grabSlice(gameState.currentTerms, 0, 2);
  gameState.secondPair = grabSlice(gameState.currentTerms, 2, 4);

  loop.push({
    type: jsPsychPreload,
    images: () => gameState.currentTerms.map(item => item.image)
  });

  loop.push(makeLearningBlock(gameState.firstPair, baseLang, targetLang));
  loop.push(makeMorphBlock(gameState.firstPair, gameState, targetLang, baseLang));
  loop.push(makeAfcBlock(gameState.firstPair, gameState, targetLang, baseLang));
  loop.push(makeMorphBlock(gameState.firstPair, gameState, targetLang, baseLang, true));
  loop.push(makeTypingBlock(gameState.firstPair, gameState, targetLang, baseLang));

  loop.push(makeLearningBlock(gameState.secondPair, baseLang, targetLang));
  loop.push(makeMorphBlock(gameState.secondPair, gameState, targetLang, baseLang));
  loop.push(makeAfcBlock(gameState.secondPair, gameState, targetLang, baseLang));
  loop.push(makeMorphBlock(gameState.secondPair, gameState, targetLang, baseLang, true));
  loop.push(makeTypingBlock(gameState.secondPair, gameState, targetLang, baseLang));

  loop.push(makeMatchGridBlock(gameState.currentTerms, gameState, targetLang, baseLang));

  loop.push(makeEndScreen(baseLang, targetLang, topic, wordList));
  return loop;
}

// ------------------------
// End Screen
// ------------------------

function makeEndScreen(baseLang, targetLang, topic, wordList) {
  return {
    type: jsPsychHtmlButtonResponse,
    choices: ["Home", "Repeat Words", "Shuffle Words"],
    stimulus: () => {
      const data = gameState.currentTerms;
      return `
        <div class="gloss-block-complete">
          <h2>Practice complete!</h2>
          <p>Your score: <span class="gloss-score">${gameState.score}</span> 
          out of <span class="gloss-total">${gameState.total}</span> 
          (<span class="gloss-percent">${((gameState.score / gameState.total) * 100).toFixed(2)}%</span>)</p>
          <p><strong>Word mastery:</strong></p>
          <ul class="gloss-word-list">
            ${data.map(item => {
              const key = item.entry;
              const termData = gameState.termScores[key][targetLang];
              const percent = termData.seen > 0
                ? ((termData.correct / termData.seen) * 100).toFixed(2)
                : '0.00';
              const stars = percent === '100.00' ? '⭐️⭐️⭐️⭐️⭐️' :
                            percent >= 80 ? '⭐️⭐️⭐️⭐️' :
                            percent >= 60 ? '⭐️⭐️⭐️' :
                            percent >= 40 ? '⭐️⭐️' : '⭐️';
              return `
                <li class="gloss-word-item">
                  <strong>${item.data[targetLang]['translation']}</strong>
                  (${item.data[baseLang]['translation']})
                  <span class="gloss-stars">${stars}</span>
                </li>`;
            }).join('')}
          </ul>
          <p class="gloss-next">What would you like to do next?</p>
          <p class="gloss-note"><em>Choosing "Home" will take you back to the Glossolalia homepage.</em></p>
        </div>`;
    },
    on_finish: (data) => {
      if (data.response === 0) {
        window.location.href = "https://glossolalia.app";
      } else if (data.response === 1) {
        jsPsych.addNodeToEndOfTimeline({ timeline: generateGameLoop(baseLang, targetLang, topic, filteredData) });
      } else if (data.response === 2) {
        let reshuffled = shuffleArray(nounVocav[topic].filter(item => item.data[targetLang] && item.data[baseLang]))
        reshuffled = reshuffled.slice(0, 4);
        console.log("Shuffling words for a new game with the following terms:");
        reshuffled.forEach(item => {
          console.log(`- ${item.data[baseLang]['translation']} (${item.data[targetLang]['translation']})`);
        });
        jsPsych.addNodeToEndOfTimeline({ timeline: generateGameLoop(baseLang, targetLang, topic, reshuffled) });
      }
    }
  };
}

// ------------------------
// Start
// ------------------------

timeline.push({
  type: jsPsychHtmlButtonResponse,
  stimulus: `<h1>Welcome to Glossolalia!</h1>
             <p>You are currently learning animal names in <strong>${targetLanguage}</strong>.</p>`,
  choices: ["Begin"]
});

timeline.push(...generateGameLoop(baseLanguage, targetLanguage, currentTopic, filteredData));

function countTrials(tl) {
  let count = 0;
  tl.forEach(item => {
    if (item.timeline_variables) count += item.timeline_variables.length;
    if (item.timeline) count += countTrials(item.timeline);
  });
  return count;
}

const totalTrials = countTrials(timeline);

let currentTrial = 0;

jsPsych.run(timeline);
