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

const trial = {
    type: jsPsychSimpleImageClozeResponse,
    stimulus: '../images/vectorOctopus.png',
    prompt: `<h1>Octopus</h1>
              <p>Type the word in <strong>Finnish</strong>.</p>`,
    correct_response: 'tursas',
    on_finish: (data) => {
      const key = 'octopus';
      const correctAnswer = 'tursas';
      const isCorrect = data.response.toLowerCase() === correctAnswer.toLowerCase();
      updateScore(gameState, key, targetLang, isCorrect);
    }
  };

timeline.push(trial);

// ------------------------
// Start the experiment
// ------------------------
jsPsych.run(timeline);