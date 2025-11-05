discard

// secondPair = multilingualAnimals.slice(2,4);
// var trials3 = {
//     timeline: [
//       {
//         type: jsPsychSimpleImageButtonResponse,
//         stimulus: jsPsych.timelineVariable('image'),
//         choices: ["Continue"],
//         prompt: function() {
//           return `<h1>${jsPsych.timelineVariable('Finnish')}</h1>
//           <p>(${jsPsych.timelineVariable('English')})</p>`;
//         }
//       }
//     ],
//     timeline_variables: secondPair, 
//     randomize_order: true
// }

// timeline.push(trials3);

// var trials4 = {
//   timeline: [
//     {
//       type: jsPsychSimpleImageButtonResponse,
//       stimulus: jsPsych.timelineVariable('image'),
//       choices: function() {
//         const correctAnswer = jsPsych.timelineVariable('Finnish');
//         const competitor = determineCompetitors(secondPair, correctAnswer)[0];
//         return shuffleArray([correctAnswer, competitor]);
//       },
//       on_start: function() {
//         console.log("Current stimulus: "+jsPsych.timelineVariable('Finnish')+" with competitor: "+determineCompetitors(secondPair, jsPsych.timelineVariable('Finnish')))
//       },
//       correct_choice: jsPsych.timelineVariable('Finnish'),
//     }
//   ],
//   timeline_variables: secondPair,
//   randomize_order: true
// }

// timeline.push(trials4);

// firstReviewBlockVariables = multilingualAnimals.slice(0,4);
// var reviewTrials1 = {
//   timeline: [
//     {
//       type: jsPsychSimpleImageButtonResponse,
//       stimulus: jsPsych.timelineVariable('image'),
//       correct_choice: jsPsych.timelineVariable('Finnish'),
//       choices: function() {
//         const correctAnswer = jsPsych.timelineVariable('Finnish');
//         const competitors = determineCompetitors(firstReviewBlockVariables, correctAnswer, 3);
//         const allChoices = [correctAnswer, ...competitors];
//         return shuffleArray(allChoices);
//       }
//     }
//     ],
//     timeline_variables: firstReviewBlockVariables,
//     randomize_order: true
// }

// timeline.push(reviewTrials1);

// if (currentLanguage === "chaos") {
//     const getRandomLanguage = () => {
//       const languages = ["English", "Finnish", "Spanish"];
//       return languages[Math.floor(Math.random() * languages.length)];
//     }
//   }