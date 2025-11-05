function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

let baseLanguage = getQueryParam("lang") || "English"; 
let targetLanguage = getQueryParam("target") || "Finnish";
let currentTopic = getQueryParam("topic") || "animals";

// Take 6 items randomly
let filteredData = shuffleArray(
    nounVocav[currentTopic].filter(item => item.data[targetLanguage] && item.data[baseLanguage])
).slice(0, 4);

// ------------------------
// Generate a single memory card trial
// ------------------------
function generateGame(vocabData) {
    let loopTimeline = [];

    let memoryCardTrial = {
        type: jsPsychMemoryCards,
        cards: vocabData.map(item => ({
            entry: item.entry,
            image: item.image,
            translation: item.data[targetLanguage].translation
        })),
        n_cols: 4,
        n_rows: 2,
        on_finish: function(data) {
            const response = data.response;

            if (response === 'Play Again') {
                console.log("Play Again clicked, restarting game...");
                // Add a NEW trial at the end
                var newData = jsPsych.randomization.shuffle(nounVocav[currentTopic].filter(item => item.data[targetLanguage] && item.data[baseLanguage])).slice(0, 4);
                var newGameTrial = generateGame(newData);
                jsPsych.addNodeToEndOfTimeline({ timeline: newGameTrial });
            } else if (response === 'Home') {
                console.log("Continue home, returning to homepage...");
                window.location.href = "https://glossolalia.app"; // Redirect to homepage or another page as needed
            }
        },
        on_start: function() {
            console.log("Memory card trial starting with the following cards:");
        }
    };

    loopTimeline.push(memoryCardTrial);

    return loopTimeline;
}

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

// ------------------------
// Main timeline
// ------------------------
let timeline = [];

var welcomeSlide = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `<h1>Welcome to Glossolalia!</h1><br>
               <p>You are currently practicing animal names in <strong>${targetLanguage}</strong>.</p>`,
    choices: ["Begin"]
  };
  
timeline.push(welcomeSlide);

// Add the first game trial
var firstGameTrial = generateGame(filteredData);
timeline.push(...firstGameTrial);

jsPsych.run(timeline);
