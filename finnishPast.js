// ------------------------
// Initialize jsPsych
// ------------------------
const jsPsych = initJsPsych({
  show_progress_bar: false,
  auto_update_progress_bar: false,
  on_finish: function () {
    console.log("Experiment finished");
  }
});

// Main timeline
let timeline = [];

const helloWorldtrial = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `<h1>Welcome to Glossolalia!</h1><p>You're currently learning: Finnish (past tense).</p><br><br>Click below to start practicing!</p>`,
  choices: ['Start Practice'],
  on_finish: function() {
    console.log("Experiment started");
  }
}

timeline.push(helloWorldtrial);

const gameState = {
  currentLangauge: null,
  currentTense: null,
  currentCase: null,
  correctAnswers: 0,
  totalQuestions: 0 
}

// ------------------------
// Trial Generator
// ------------------------
function generatePracticeBlock(tense, language = "Finnish", numTrials = 10) {
  const innerTimeline = [];

  const persons = [
    { number: "singular", person: "first", label: "Minä" },
    { number: "singular", person: "second", label: "Sinä" },
    { number: "singular", person: "third", label: "Hän" },
    { number: "plural", person: "first", label: "Me" },
    { number: "plural", person: "second", label: "Te" },
    { number: "plural", person: "third", label: "He" }
  ];

  // Build distractors for each person/number/tense
  const allForms = {};
  for (let p of persons) {
    const key = `${tense}-${p.number}-${p.person}`;
    allForms[key] = finnishVerbs.map(v => v[tense][p.number][p.person]);
  }
  
  // Only count verbs that have at least one non-empty person/number form for the tense
  const verbsWithTense = finnishVerbs.filter(verb => {
    if (!verb[tense]) return false;
    return ["singular", "plural"].some(num =>
      verb[tense][num] &&
      Object.values(verb[tense][num]).some(val => typeof val === "string" && val.length > 0)
    );
  });
  console.log(`Found ${verbsWithTense.length} verbs with at least one "${tense}" form.`);

  const allTrials = finnishVerbs.filter(verb => verb[tense] && Object.keys(verb[tense]).length > 0).flatMap(verb => {
    return persons.map(person => {
      if (verb[tense][person.number] && verb[tense][person.number][person.person]) {
        const correct = verb[tense][person.number][person.person];
        // Grab all forms of this verb in this tense (across persons/numbers)
        const allForms = persons.map(p => verb[tense][p.number]?.[p.person]).filter(Boolean);
        const distractors = jsPsych.randomization
          .sampleWithoutReplacement(allForms.filter(f => f !== correct), 3);
        const choices = jsPsych.randomization.shuffle([correct, ...distractors]);

        const trial = {
          type: jsPsychHtmlButtonResponse,
          prompt: `Select the correct form of the verb:`,
          stimulus: `<p><strong>${person.label}</strong> _ (${verb.infinitive})</p>`,
          choices: choices,
          data: {
            correct_answer: correct,
            verb: verb.infinitive,
            person: person.person,
            number: person.number,
            tense: tense,
            choices: choices
          },
          on_finish: function(data) {
            const userAnswer = data.response !== null ? choices[data.response] : "";
            data.user_answer = userAnswer;
            data.correct = userAnswer === correct;
            gameState.totalQuestions++;
            if (data.correct) gameState.correctAnswers++;
          }
        };

        const feedback = {
          type: jsPsychHtmlButtonResponse,
          stimulus: function() {
            const lastTrial = jsPsych.data.get().last(1).values()[0];
            const correct = lastTrial.correct_answer;
            const userAnswer = lastTrial.user_answer;
            const pronoun = persons.find(p =>
              p.person === lastTrial.person && p.number === lastTrial.number
            ).label;
            const correctSentence = `<strong>${pronoun}</strong> <span style="color:green">${correct}</span>`;
            const userFeedback = userAnswer === correct
              ? `<p>You chose: <span style="color:green">${userAnswer}</span> ✅</p>`
              : `<p>You chose: <span style="color:red">${userAnswer}</span> ❌</p>`;
            return `${correctSentence}<br>${userFeedback}`;
          },
          choices: ['Next']
        };

        return [trial, feedback];
      }
      return null;
    }).filter(Boolean);
  });
  
  // Randomly select a subset of trial-feedback pairs
  console.log(`Generated ${allTrials.length} total trials for ${tense} tense.`);
  const selectedTrialPairs = jsPsych.randomization.sampleWithoutReplacement(allTrials, numTrials);
  selectedTrialPairs.forEach(pair => innerTimeline.push(...pair));

  const feedbackSummary = {
    type: jsPsychHtmlButtonResponse,
    stimulus: function() {
      return `<h2>Practice Complete!</h2>
              <p>You got ${gameState.correctAnswers} out of ${gameState.totalQuestions} correct.</p>
              <p>Would you like to practice again?</p>`;
    },
    choices: ['Practice Again', 'Main Menu'],
    on_finish: function(data) {
      if (data.response === 0) {
        gameState.correctAnswers = 0;
        gameState.totalQuestions = 0;
        const newBlock = generatePracticeBlock(tense, language, numTrials);
        jsPsych.addNodeToEndOfTimeline({ timeline: newBlock });
      }
    }
  };

  innerTimeline.push(feedbackSummary);
  return innerTimeline;
}


firstBlock = generatePracticeBlock("past", "Finnish", 10);
timeline.push(...firstBlock);
// ------------------------
// Start the experiment
// ------------------------
jsPsych.run(timeline);
