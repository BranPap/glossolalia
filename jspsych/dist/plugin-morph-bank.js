var jsPsychMorphBank = (function (jspsych) {
    'use strict';

    const info = {
        name: 'morph-bank',
        parameters: {
            prompt: {
                type: jspsych.ParameterType.STRING,
                default: null,
                description: 'Any content to display above the stimulus.'
            },
            stimulus: {
                type: jspsych.ParameterType.STRING,
                default: undefined,
                description: 'Path to the image to be displayed'
            },
            morphemes: {
                type: jspsych.ParameterType.ARRAY,
                default: undefined,
                description: 'Array of morphemes to be displayed as buttons. The order of the array should be passed in the corrected order.'
            },
            button_html: {
                type: jspsych.ParameterType.STRING,
                pretty_name: 'Button HTML',
                default: '<button class="jspsych-btn">%morpheme%</button>',
                description: 'HTML for the button. %morpheme% will be replaced with label text.'
            },
            picked_button_html: {
                type: jspsych.ParameterType.STRING,
                pretty_name: 'Picked Button HTML',
                default: '<button class="jspsych-btn-picked">%morpheme%</button>',
                description: 'HTML for the button once it has been picked. %morpheme% will be replaced with label text.'
            },
            correct_button_html: {
                type: jspsych.ParameterType.STRING,
                pretty_name: 'Correct Button HTML',
                default: '<button class="jspsych-btn-correct">%morpheme%</button>',
                description: 'HTML for the button once the correct answer has been submitted. %morpheme% will be replaced with label text.'
            },
            distractor_morphemes: {
                type: jspsych.ParameterType.ARRAY,
                default: [],
                description: 'Array of distractor morphemes to be displayed as buttons'
            },
            segment_level : {
                type: jspsych.ParameterType.STRING,
                default: "morpheme"
            }
        }
    };

    class MorphBankPlugin {
        constructor(jsPsych) {
            this.jsPsych = jsPsych;
        }

        trial(display_element, trial) {
            let html = '';

            // show prompt
            if (trial.prompt !== null) {
                html += '<div id="jspsych-morph-bank-prompt">' + trial.prompt + '</div>';
            };

            // divider to hold sentence as it is constructed
            html += '<div id="jspsych-morph-bank-divider"></div>';

            // show stimulus
            if (trial.stimulus !== undefined) {
                html += '<div id="jspsych-morph-bank-stimulus"><img src="' + trial.stimulus + '" style="max-width: 400px;"></div>';
            };


            // create morpheme buttons
            let morphemeButtons = [];
            for (let i = 0; i < trial.morphemes.length; i++) {
                let morpheme = trial.morphemes[i];
                let button = trial.button_html.replace('%morpheme%', morpheme);
                morphemeButtons.push(button);
            }

            for (let i = 0; i < trial.distractor_morphemes.length; i++) {
                let morpheme = trial.distractor_morphemes[i];
                let button = trial.button_html.replace('%morpheme%', morpheme);
                morphemeButtons.push(button);
            }

            morphemeButtons = this.jsPsych.randomization.shuffle(morphemeButtons);

            html += '<div id="jspsych-morph-bank-btngroup">';
            for (let i = 0; i < morphemeButtons.length; i++) {
                html += morphemeButtons[i];
            }
            html += '</div>';

            html += `<div id="jspsych-morph-bank-metabuttons">
            <button id="jspsych-morph-bank-submit" class="jspsych-btn">Submit</button>
            </div>`;


            display_element.innerHTML = html;

            let response = {
                rt: null,
                morphemes: []
            };

            let start_time = performance.now();

            // event listeners for buttons
            let buttons = display_element.querySelectorAll('#jspsych-morph-bank-btngroup button');
            for (let i = 0; i < buttons.length; i++) {
                let button = buttons[i];
                button.addEventListener('click', () => {
                    if (button.classList.contains('jspsych-btn')) {
                        button.classList.remove('jspsych-btn'); 
                        button.classList.add('jspsych-btn-selected');
                        let morpheme = button.innerHTML;
                        let displayMorpheme = trial.picked_button_html.replace('%morpheme%', morpheme);
                        let divider = display_element.querySelector('#jspsych-morph-bank-divider');
                        if (trial.segment_level === "morpheme") {
                            divider.innerHTML += displayMorpheme;
                        } else if (trial.segment_level === "word") {
                            divider.innerHTML += ' ' + morpheme + ' ';
                        }
                        response.morphemes.push(morpheme);
                    } else if (button.classList.contains('jspsych-btn-selected')) {
                        button.classList.remove('jspsych-btn-selected');
                        button.classList.add('jspsych-btn');
                        let morpheme = button.innerHTML;
                        let divider = display_element.querySelector('#jspsych-morph-bank-divider');
                        divider.innerHTML = divider.innerHTML.replace(trial.picked_button_html.replace('%morpheme%', morpheme), '');
                        let index = response.morphemes.indexOf(morpheme);
                        response.morphemes.splice(index, 1);
                    };
                })
            }

            const end_trial = () => {
                if (response.morphemes.length === 0) {
                    alert("Please select at least one morpheme before submitting.");
                    return;
                }
                for (let i = 0; i < buttons.length; i++) {
                    buttons[i].disabled = true;
                }
                const trial_data = {
                    rt: response.rt,
                    stimulus: trial.stimulus,
                    isCorrect: response.morphemes.toString() === trial.morphemes.toString(),
                    response: response.morphemes
                };
                let divider = display_element.querySelector('#jspsych-morph-bank-divider');
                let correctButton = trial.correct_button_html.replace('%morpheme%', trial.morphemes.join(''));
                let responseButton = trial.correct_button_html.replace('%morpheme%', response.morphemes.join(''));

                if (!trial_data.isCorrect) {
                    divider.innerHTML = `${responseButton}`.replace('correct', 'incorrect');
                    setTimeout(() => {
                        divider.innerHTML = `${correctButton}`;
                    }, 1500);
                    setTimeout(() => {
                        display_element.innerHTML = '';
                        this.jsPsych.finishTrial(trial_data);
                    }, 4500);
                    return; 
                }

                divider.innerHTML = `${correctButton}`;
                setTimeout(() => {
                    display_element.innerHTML = '';
                    this.jsPsych.finishTrial(trial_data);
                }, 1500);
        }
            

            display_element.querySelector('#jspsych-morph-bank-submit').addEventListener('click', () => {
                const submitButton = display_element.querySelector('#jspsych-morph-bank-submit');
                submitButton.disabled = true;
                let end_time = performance.now();
                response.rt = end_time - start_time;
                end_trial();
            });
        }
    };

    MorphBankPlugin.info = info;
    return MorphBankPlugin;


})(jsPsychModule);