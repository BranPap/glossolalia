var jsPsychSimpleImageButtonResponse = (function (jspsych) {
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
        choices: {
          type: jspsych.ParameterType.STRING,
          pretty_name: 'Choices',
          array: true,
          default: [],
          description: 'Labels for the buttons.'
        },
        button_html: {
          type: jspsych.ParameterType.STRING,
          pretty_name: 'Button HTML',
          default: '<button class="jspsych-btn">%choice%</button>',
          description: 'HTML for the button. %choice% will be replaced with label text.'
        },
        correct_choice: {
          type: jspsych.ParameterType.STRING,
          pretty_name: 'Correct Choice',
          default: null,
          description: 'The correct choice for the trial.'
        },
      }
    };
  
    class SimpleImageButtonResponsePlugin {
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
          html += `<div><img src="${trial.stimulus}" style="max-width: 400px;"></div><br>`;
        }
        
        
  
        // buttons
        html += `<div id="jspsych-simple-btn-group">`;
        trial.choices.forEach((choice, i) => {
          html += trial.button_html.replace(/%choice%/g, choice);
        });
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
            response: response.button,
          };
  
          display_element.innerHTML = "";
  
          this.jsPsych.finishTrial(trial_data);
        };
  
        // add listeners
        const start_time = performance.now();
        const btns = display_element.querySelectorAll('button');
        const correctButton = trial.correct_choice;
        
        btns.forEach((btn) => {
          btn.addEventListener('click', () => {
            btns.forEach(b => b.disabled = true); // disable all buttons

            const end_time = performance.now();
            response.rt = end_time - start_time;
            response.button = btn.innerHTML;
        
            if (trial.correct_choice !== null) {
              if (response.button === trial.correct_choice) {
                response.correct = true;
                btn.style.backgroundColor = 'rgb(178, 248, 178)';
              } else {
                response.correct = false;
                btn.style.backgroundColor = 'rgb(224, 152, 152)';
                btn.style.color = 'rgb(255, 255, 255)';
        
                // highlight the correct button
                btns.forEach(b => {
                  if (b.innerHTML === correctButton) {
                    b.style.backgroundColor = 'rgb(178, 248, 178)';
                  };
                });
              }
              setTimeout(() => { end_trial(); }, 1500);
            } else {
              setTimeout(() => { end_trial(); }, 1500);
            }
            
          });
        });        
      }
    }
  
    SimpleImageButtonResponsePlugin.info = info;
    return SimpleImageButtonResponsePlugin;
  
  })(jsPsychModule);
  