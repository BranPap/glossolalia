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
filteredLanguage = filteredLanguage.slice(0,3)

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
  secondPair : grabSlice(filteredLanguage, 2, 3)
}

var welcomeSlide = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `<h1>Welcome to Glossolalia!</h1><br>
               <p>You are currently learning animal names in <strong>${currentLanguage}</strong>.</p>`,
    choices: ["Begin"]
}

timeline.push(welcomeSlide);
console.log(gameState)

var trials = {
  timeline: [
    {
      type: jsPsychSimpleImageButtonResponse,
      stimulus: jsPsych.timelineVariable('image'),
      choices: ["Continue"],
      prompt: function() {
        const langWord = jsPsych.timelineVariable(currentLanguage);
        const englishWord = jsPsych.timelineVariable('English');
        return `<h1>${langWord}</h1>
                <p>(${englishWord})</p>`;
      }
    }
  ],
  timeline_variables: gameState.firstPair,
  randomize_order: true
};

timeline.push(trials);

var trials2 = {
  timeline: [
    {
      type: jsPsychSimpleImageButtonResponse,
      stimulus: jsPsych.timelineVariable('image'),
      choices: function() {
        const correctAnswer = jsPsych.timelineVariable(currentLanguage);
        const competitor = determineCompetitors(gameState.firstPair, correctAnswer, 1, currentLanguage)[0];
        return shuffleArray([correctAnswer, competitor]);
      },
      prompt: function() {
        return `<h1>${jsPsych.timelineVariable('English')}</h1>`;
      },
      correct_choice: jsPsych.timelineVariable(currentLanguage),
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

timeline.push(trials2);

// ------------------------
// Second Pair
// ------------------------

secondPair = filteredLanguage.slice(2,3);
var trials3 = {
  timeline: [
    {
      type: jsPsychSimpleImageButtonResponse,
      stimulus: jsPsych.timelineVariable('image'),
      choices: ["Continue"],
      prompt: function() {
        const langWord = jsPsych.timelineVariable(currentLanguage);
        const englishWord = jsPsych.timelineVariable('English');
        return `<h1>${langWord}</h1>
                <p>(${englishWord})</p>`;
      }
    }
  ],
  timeline_variables: gameState.secondPair,
  randomize_order: true
};

timeline.push(trials3);

var trials4 = {
  timeline: [
    {
      type: jsPsychSimpleImageButtonResponse,
      stimulus: jsPsych.timelineVariable('image'),
      choices: function() {
        const correctAnswer = jsPsych.timelineVariable(currentLanguage);
        const competitor = determineCompetitors(gameState.currentTerms, correctAnswer, 1, currentLanguage)[0];
        return shuffleArray([correctAnswer, competitor]);
      },
      prompt: function() {
        return `<h1>${jsPsych.timelineVariable('English')}</h1>`;
      },
      correct_choice: jsPsych.timelineVariable(currentLanguage),
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

timeline.push(trials4);

var reviewTrials1 = {
  timeline: [
    {
      type: jsPsychSimpleImageButtonResponse,
      stimulus: jsPsych.timelineVariable('image'),
      correct_choice: jsPsych.timelineVariable(currentLanguage),
      choices: function() {
        const correctAnswer = jsPsych.timelineVariable(currentLanguage);
        const competitors = determineCompetitors(gameState.currentTerms, correctAnswer, 3);
        const allChoices = [correctAnswer, ...competitors];
        return shuffleArray(allChoices);
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
    timeline_variables: gameState.currentTerms,
    randomize_order: true
}

timeline.push(reviewTrials1);

// ------------------------
// Final Screen
// ------------------------
var end = {
    type: jsPsychHtmlButtonResponse,
    choices: ["Home", "Repeat Words", "Shuffle Words"],
    stimulus: function() {
      return `<h1>End of practice session</h1>
               <p>Your score: ${gameState.score} out of ${gameState.total} (${((gameState.score/gameState.total)*100).toFixed(2)}%)</p>
               <p>You can go back to the home page, repeat the same words, or shuffle and try new words.</p>`
    }
}

timeline.push(end);

var loop_node = {
  timeline: timeline,
  loop_function: function(data) {
    let last_response = data.values().slice(-1)[0].response;
    if (last_response === 1) {
      // "Repeat Words" → repeat the whole block
      gameState.score = 0;
      gameState.total = 0;
      filteredLanguage = shuffleArray(filteredLanguage); 
      return true;
    } else if (last_response === 2) {
      window.location.reload();
    } else {
      // "Home" → stop looping
      window.location.href = "index.html";
      return false;
    }
  }
};

// ------------------------
// Start the experiment
// ------------------------
jsPsych.run([loop_node]);