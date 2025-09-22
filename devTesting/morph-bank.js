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
    type: jsPsychMorphBank,
    prompt: "<h1>Build the word!</h1><p>Click the segments in the correct order to form the word for 'octopus' in Finnish.</p>",
    stimulus: '../images/vectorOctopus.png',
    morphemes: ['tur', 'sas'],
}

timeline.push(trial);

// ------------------------
// Start the experiment
// ------------------------
jsPsych.run(timeline);