var jsPsychSimpleImageClozeResponse = (function (jspsych) {
    'use strict';
  
    const info = {
      name: 'simple-image-button-response',
      parameters: {
        stimulus: {
          type: jspsych.ParameterType.STRING,
          pretty_name: 'Stimulus',
          default: null,
          description: 'The path to the image file.'
        },
        prompt: {
          type: jspsych.ParameterType.STRING,
          pretty_name: 'Prompt',
          default: null,
          description: 'Any content to display above the image.'
        },
        button_html: {
          type: jspsych.ParameterType.STRING,
          pretty_name: 'Button HTML',
          default: '<button class="jspsych-btn">%choice%</button>',
          description: 'HTML for the button. %choice% will be replaced with label text.'
        },
        correct_response: {
          type: jspsych.ParameterType.STRING,
          pretty_name: 'Correct Response',
          default: null,
          description: 'The correct response for the trial.'
        },
      }
    };
  
    class SimpleImageClozeResponsePlugin {
      constructor(jsPsych) {
        this.jsPsych = jsPsych;
      }
  
      trial(display_element, trial) {
        let html = "";
  
        // prompt above the image
        if (trial.prompt) {
          html += trial.prompt+"<br>";
        }

        // the image
        if (trial.stimulus) {
          html += `<div><img src="${trial.stimulus}" style="max-width: 400px; max-height: 400px"></div><br>`;
        }
        
        
  
        // buttons
        html += `<div id="jspsych-cloze-response">`;
        html += `<input type="text" id="jspsych-cloze-response-input" autocomplete="off"><br><br>`;
        html += `<button class="jspsych-btn" id="jspsych-cloze-response-submit" style="font-size: 24px; padding: 10px; width: 150px;">Submit</button>`;
        html += `</div>`;
  
        display_element.innerHTML = html;
  
        // response object
        let response = {
          rt: null,
          button: null,
        };
  
        // function to end trial
        const end_trial = () => {
          this.jsPsych.pluginAPI.clearAllTimeouts();
  
          const trial_data = {
            rt: response.rt,
            stimulus: trial.stimulus,
            response: response.text,
          };
  
          display_element.innerHTML = "";
  
          this.jsPsych.finishTrial(trial_data);
        };
  
        // add listeners
        const start_time = performance.now();
        const btns = display_element.querySelectorAll('button');
        const correctResponse = trial.correct_response;
        
        btns.forEach((btn) => {
          btn.addEventListener('click', () => {

            let inputField = document.getElementById('jspsych-cloze-response-input')
            if (inputField.value.trim() === "") {
              alert("Please enter a response before submitting.");
              return;
            };

            inputField.disabled = true; // disable input field

            btns.forEach(b => b.disabled = true); // disable all buttons

            const end_time = performance.now();
            response.rt = end_time - start_time;
            response.text = document.getElementById('jspsych-cloze-response-input').value;
            response.trimmed = response.text.trim().toLowerCase();
            let responseText = document.getElementById('jspsych-cloze-response-input')

            if (trial.correct_choice !== null) {
              if (response.trimmed === trial.correct_response.toLowerCase()) {
                response.correct = true;
                responseText.style.color = 'rgb(99, 196, 99)';
              } else {
                response.correct = false;
                setTimeout(() => {
                  responseText.value = trial.correct_response;
                  responseText.style.color = 'rgb(99, 196, 99)';
                }, 1500);
                responseText.style.color = 'rgb(225, 119, 119)';
              }
              if (response.correct) {
                setTimeout(() => { end_trial(); }, 1500);
              } else if (!response.correct) {
                setTimeout(() => { end_trial(); }, 4500);
              }
            } else {
              setTimeout(() => { end_trial(); }, 1500);
            }
            
          });
        });        
      }
    }
  
    SimpleImageClozeResponsePlugin.info = info;
    return SimpleImageClozeResponsePlugin;
  
  })(jsPsychModule);
  