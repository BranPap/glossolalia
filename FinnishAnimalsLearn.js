// ------------------------
// Initialize jsPsych
// ------------------------
const jsPsych = initJsPsych({
    show_progress_bar: false,
    auto_update_progress_bar: false,
    on_finish: function () {
      console.log("Experiment finished");
      jsPsych.data.displayData('csv');
    }
  });
  
// Main timeline
let timeline = [];

const finnishAnimals = [ {
    "English": "lion",
    "Finnish": "leijona",
    "image": "images/vectorLion.png"
},
{
    "English": "octopus",
    "Finnish": "mustekala",
    "image": "images/vectorOctopus.png"
},
{
    "English": "whale",
    "Finnish": "valas",
    "image": "images/vectorWhale.png"
},
{
    "English": "wolf",
    "Finnish": "susi",
    "image": "images/vectorWolf.png"
}
]

shuffleArray(finnishAnimals);

const finnishAnimalLexemes = finnishAnimals.map(item => item.Finnish);

const determineCompetitors = (possibilities, correctAnswer, n = 1) => {
  // Filter out the correct answer
  const allCompetitors = possibilities.filter(item => item.Finnish !== correctAnswer);
  const selectedCompetitors = [];

  for (let i = 0; i < n; i++) {
    if (allCompetitors.length === 0) break; // safety

    // pick a random index
    const randomIndex = Math.floor(Math.random() * allCompetitors.length);

    // get the object and remove it from the array
    const competitor = allCompetitors.splice(randomIndex, 1)[0]; // returns an array
    selectedCompetitors.push(competitor.Finnish); // store Finnish word
  }

  return selectedCompetitors;
};

firstPair = finnishAnimals.slice(0,2);
var trials = {
    timeline: [
      {
        type: jsPsychSimpleImageButtonResponse,
        stimulus: jsPsych.timelineVariable('image'),
        choices: ["Continue"],
        prompt: function() {
          return `<h1>${jsPsych.timelineVariable('Finnish')}</h1>
          <p>(${jsPsych.timelineVariable('English')})</p>`;
        }
      }
    ],
    timeline_variables: firstPair, 
    randomize_order: true
}

timeline.push(trials);

var trials2 = {
  timeline: [
    {
      type: jsPsychSimpleImageButtonResponse,
      stimulus: jsPsych.timelineVariable('image'),
      choices: function() {
        const correctAnswer = jsPsych.timelineVariable('Finnish');
        const competitor = determineCompetitors(firstPair, correctAnswer, 1)[0];
        return shuffleArray([correctAnswer, competitor]);
      },
      on_start: function() {
        console.log("Current stimulus: "+jsPsych.timelineVariable('Finnish')+" with competitor: "+determineCompetitors(firstPair, jsPsych.timelineVariable('Finnish')))
      },
      correct_choice: jsPsych.timelineVariable('Finnish'),
    }
  ],
  timeline_variables: firstPair,
  randomize_order: true
}

timeline.push(trials2);

secondPair = finnishAnimals.slice(2,4);
var trials3 = {
    timeline: [
      {
        type: jsPsychSimpleImageButtonResponse,
        stimulus: jsPsych.timelineVariable('image'),
        choices: ["Continue"],
        prompt: function() {
          return `<h1>${jsPsych.timelineVariable('Finnish')}</h1>
          <p>(${jsPsych.timelineVariable('English')})</p>`;
        }
      }
    ],
    timeline_variables: secondPair, 
    randomize_order: true
}

timeline.push(trials3);

var trials4 = {
  timeline: [
    {
      type: jsPsychSimpleImageButtonResponse,
      stimulus: jsPsych.timelineVariable('image'),
      choices: function() {
        const correctAnswer = jsPsych.timelineVariable('Finnish');
        const competitor = determineCompetitors(secondPair, correctAnswer)[0];
        return shuffleArray([correctAnswer, competitor]);
      },
      on_start: function() {
        console.log("Current stimulus: "+jsPsych.timelineVariable('Finnish')+" with competitor: "+determineCompetitors(secondPair, jsPsych.timelineVariable('Finnish')))
      },
      correct_choice: jsPsych.timelineVariable('Finnish'),
    }
  ],
  timeline_variables: secondPair,
  randomize_order: true
}

timeline.push(trials4);

firstReviewBlockVariables = finnishAnimals.slice(0,4);
var reviewTrials1 = {
  timeline: [
    {
      type: jsPsychSimpleImageButtonResponse,
      stimulus: jsPsych.timelineVariable('image'),
      correct_choice: jsPsych.timelineVariable('Finnish'),
      choices: function() {
        const correctAnswer = jsPsych.timelineVariable('Finnish');
        const competitors = determineCompetitors(firstReviewBlockVariables, correctAnswer, 3);
        const allChoices = [correctAnswer, ...competitors];
        return shuffleArray(allChoices);
      }
    }
    ],
    timeline_variables: firstReviewBlockVariables,
    randomize_order: true
}

timeline.push(reviewTrials1);


// ------------------------
// Start the experiment
// ------------------------
jsPsych.run(timeline);