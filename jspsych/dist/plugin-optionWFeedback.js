var optionWFeedback = (function (jspsych) {
    'use strict';
  
    const info = {
      name: "optionWFeedback",
      parameters: {
        stimulus: {
          type: jspsych.ParameterType.HTML_STRING,
          pretty_name: "Stimulus",
          default: undefined,
        },
        choices: {
          type: jspsych.ParameterType.STRING,
          pretty_name: "Choices",
          default: undefined,
          array: true,
        },
        correct_answer: {
          type: jspsych.ParameterType.STRING,
          pretty_name: "Correct Answer",
          default: undefined,
        },
        button_html: {
          type: jspsych.ParameterType.HTML_STRING,
          pretty_name: "Button HTML",
          default: '<button class="jspsych-btn">%choice%</button>',
          array: true,
        },
        prompt: {
          type: jspsych.ParameterType.HTML_STRING,
          pretty_name: "Prompt",
          default: null,
        },
        stimulus_duration: {
          type: jspsych.ParameterType.INT,
          pretty_name: "Stimulus duration",
          default: null,
        },
        trial_duration: {
          type: jspsych.ParameterType.INT,
          pretty_name: "Trial duration",
          default: null,
        },
        feedback_duration: {
          type: jspsych.ParameterType.INT,
          pretty_name: "Feedback duration",
          default: 800,
        },
        margin_vertical: {
          type: jspsych.ParameterType.STRING,
          pretty_name: "Margin vertical",
          default: "0px",
        },
        margin_horizontal: {
          type: jspsych.ParameterType.STRING,
          pretty_name: "Margin horizontal",
          default: "8px",
        },
        response_ends_trial: {
          type: jspsych.ParameterType.BOOL,
          pretty_name: "Response ends trial",
          default: false,
        },
      },
    };
  
    class Plugin {
      constructor(jsPsych) {
        this.jsPsych = jsPsych;
      }
  
      trial(display_element, trial) {
        let html = "";
  
        if (trial.prompt !== null) {
          html += trial.prompt;
        }
  
        html += '<div id="jspsych-optionWFeedback-stimulus">' + trial.stimulus + "</div>";
  
        let buttons = [];
        if (Array.isArray(trial.button_html)) {
          if (trial.button_html.length === trial.choices.length) {
            buttons = trial.button_html;
          } else {
            console.error("Mismatched button_html and choices array lengths");
          }
        } else {
          for (let i = 0; i < trial.choices.length; i++) {
            buttons.push(trial.button_html);
          }
        }
  
        html += '<div id="jspsych-optionWFeedback-btngroup">';
        for (let i = 0; i < trial.choices.length; i++) {
          let str = buttons[i].replace(/%choice%/g, trial.choices[i]);
          html +=
            `<div class="jspsych-optionWFeedback-button" style="display:inline-block; margin:${trial.margin_vertical} ${trial.margin_horizontal}" ` +
            `id="jspsych-optionWFeedback-button-${i}" data-choice="${i}">` +
            str +
            "</div>";
        }
        html += "</div>";
        display_element.innerHTML = html;
  
        let start_time = performance.now();
        let response = { rt: null, button: null };
  
        const disableAll = () => {
          const btns = document.querySelectorAll(".jspsych-optionWFeedback-button button");
          btns.forEach(btn => btn.disabled = true);
        };
  
        const showFeedback = (clickedIdx) => {
          const correctIdx = trial.choices.indexOf(trial.correct_answer);
          const buttons = document.querySelectorAll(".jspsych-optionWFeedback-button button");
  
          if (clickedIdx === correctIdx) {
            buttons[clickedIdx].style.backgroundColor = "green";
            buttons[clickedIdx].style.color = "white";
          } else {
            buttons[clickedIdx].style.backgroundColor = "red";
            buttons[clickedIdx].style.color = "white";
            if (correctIdx >= 0) {
              buttons[correctIdx].style.backgroundColor = "green";
              buttons[correctIdx].style.color = "white";
            }
          }
        };
  
        const end_trial = () => {
          this.jsPsych.pluginAPI.clearAllTimeouts();
          const trial_data = {
            rt: response.rt,
            stimulus: trial.stimulus,
            response: response.button,
            correct: trial.choices[response.button] === trial.correct_answer
          };
          display_element.innerHTML = "";
          this.jsPsych.finishTrial(trial_data);
        };
  
        const after_response = (choice_idx) => {
          let end_time = performance.now();
          response.rt = Math.round(end_time - start_time);
          response.button = parseInt(choice_idx);
  
          display_element.querySelector("#jspsych-optionWFeedback-stimulus").classList.add("responded");
          disableAll();
          showFeedback(choice_idx);
  
          this.jsPsych.pluginAPI.setTimeout(end_trial, trial.feedback_duration);
        };
  
        for (let i = 0; i < trial.choices.length; i++) {
          display_element
            .querySelector("#jspsych-optionWFeedback-button-" + i)
            .addEventListener("click", (e) => {
              const btn_el = e.currentTarget;
              const choice = btn_el.getAttribute("data-choice");
              after_response(choice);
            });
        }
  
        if (trial.stimulus_duration !== null) {
          this.jsPsych.pluginAPI.setTimeout(() => {
            display_element.querySelector("#jspsych-optionWFeedback-stimulus").style.visibility = "hidden";
          }, trial.stimulus_duration);
        }
  
        if (trial.trial_duration !== null) {
          this.jsPsych.pluginAPI.setTimeout(end_trial, trial.trial_duration);
        }
      }
  
      simulate(trial, simulation_mode, simulation_options, load_callback) {
        if (simulation_mode === "data-only") {
          load_callback();
          this.simulate_data_only(trial, simulation_options);
        }
        if (simulation_mode === "visual") {
          this.simulate_visual(trial, simulation_options, load_callback);
        }
      }
  
      create_simulation_data(trial, simulation_options) {
        const default_data = {
          stimulus: trial.stimulus,
          rt: this.jsPsych.randomization.sampleExGaussian(500, 50, 1 / 150, true),
          response: this.jsPsych.randomization.randomInt(0, trial.choices.length - 1),
        };
        const data = this.jsPsych.pluginAPI.mergeSimulationData(default_data, simulation_options);
        this.jsPsych.pluginAPI.ensureSimulationDataConsistency(trial, data);
        return data;
      }
  
      simulate_data_only(trial, simulation_options) {
        const data = this.create_simulation_data(trial, simulation_options);
        this.jsPsych.finishTrial(data);
      }
  
      simulate_visual(trial, simulation_options, load_callback) {
        const data = this.create_simulation_data(trial, simulation_options);
        const display_element = this.jsPsych.getDisplayElement();
        this.trial(display_element, trial);
        load_callback();
        if (data.rt !== null) {
          this.jsPsych.pluginAPI.clickTarget(
            display_element.querySelector(`div[data-choice="${data.response}"] button`),
            data.rt
          );
        }
      }
    }
  
    Plugin.info = info;
    return Plugin;
  
  })(jsPsychModule);
  