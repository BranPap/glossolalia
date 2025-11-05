var jsPsychMemoryCards = (function (jspsych) {
    'use strict';
  
    const info = {
      name: 'memory-cards',
      parameters: {
        prompt: {
          type: jspsych.ParameterType.STRING,
          pretty_name: 'Prompt',
          default: 'Flip and match the cards!'
        },
        cards: {
          type: jspsych.ParameterType.ARRAY,
          pretty_name: 'Cards',
          default: [],
          description: 'Array of unique card objects (each will be duplicated).'
        },
        n_rows: {
          type: jspsych.ParameterType.INT,
          pretty_name: 'Rows',
          default: 4
        },
        n_cols: {
          type: jspsych.ParameterType.INT,
          pretty_name: 'Columns',
          default: 4
        },
        post_game_buttons: {
            type: jspsych.ParameterType.STRING,
            pretty_name: 'Post Game Buttons',
            default: ['Play Again', 'Home'],
            description: 'Labels for buttons shown after game completion. Logic should be implemented in the on_finish callback to determine what happens when each button is clicked.'
        }
      }
    };
  
    class MemoryCardsPlugin {
      constructor(jsPsych) {
        this.jsPsych = jsPsych;
      }
  
      trial(display_element, trial) {
        // Duplicate and shuffle cards
        let allCards = jsPsych.randomization.shuffle(trial.cards.concat(trial.cards));
  
        let html = `
          <div class="jspsych-memory-cards">
            <p>${trial.prompt}</p>
            <div class="jspsych-memory-cards-grid"
              style="display: grid;
                     grid-template-columns: repeat(${trial.n_cols}, 1fr);
                    grid-template-rows: repeat(${trial.n_rows}, 1fr);
                     gap: 10px;">
        `;
  
        allCards.forEach((card, index) => {
          html += `
            <div class="jspsych-memory-card" data-index="${index}">
              <div class="card-inner">
                <div class="card-front">?</div>
                <div class="card-back">
                  <img src="${card.image}" alt="${card.entry}" class="jspsych-memory-card-image"><br><br>${card.translation}
                </div>
              </div>
            </div>
          `;
        });
  
        html += '</div></div>';

        let postGameButtonsHtml = `
            <div class="jspsych-memory-cards-post-game-buttons"
                style="visibility:hidden; opacity:0; transition:opacity 0.5s; margin-top:20px; text-align:center;">
            `;
        trial.post_game_buttons.forEach((buttonLabel, index) => {
          postGameButtonsHtml += `<button class="jspsych-btn" data-btn-index="${index}">${buttonLabel}</button>`;
        });
        postGameButtonsHtml += '</div>';

        html += postGameButtonsHtml;
        
        display_element.innerHTML = html;
  
        const cards = display_element.querySelectorAll('.jspsych-memory-card');
        let flipped = [];
        let matched = [];
  
        const start_time = performance.now();
  
        let locked = false;

        cards.forEach(card => {
        card.addEventListener('click', () => {
            if (locked) return; // prevent clicks during animation

            const index = card.getAttribute('data-index');
            if (
            flipped.length < 2 &&
            !matched.includes(index) &&
            !flipped.includes(index)
            ) {
            card.classList.add('flipped');
            flipped.push(index);
            }

            if (flipped.length === 2) {
            const [a, b] = flipped;
            const first = allCards[a];
            const second = allCards[b];

            locked = true;

            if (first.entry === second.entry) {
                matched.push(a, b);
                flipped = [];
                locked = false; 
            } else {
                setTimeout(() => {
                cards[a].classList.remove('flipped');
                cards[b].classList.remove('flipped');
                flipped = [];
                locked = false; 
                }, 1200);
            }
            }

            if (matched.length === allCards.length) {
                const end_time = performance.now();
                const trial_data = {
                  matched_cards: matched.map(i => allCards[i].entry),
                  rt: end_time - start_time
                };
              
                const buttonContainer = display_element.querySelector('.jspsych-memory-cards-post-game-buttons');
                buttonContainer.style.visibility = 'visible';
                buttonContainer.style.opacity = '1';
                
              
                buttonContainer.querySelectorAll('.jspsych-btn').forEach(btn => {
                  btn.addEventListener('click', e => {
                    const btnIndex = parseInt(e.target.getAttribute('data-btn-index'));
                    display_element.innerHTML = "";
                    this.jsPsych.finishTrial({
                      ...trial_data,
                      response: trial.post_game_buttons[btnIndex]
                    });
                  });
                });
              }
              
        });
        
        });

      }
    }
  
    MemoryCardsPlugin.info = info;
    return MemoryCardsPlugin;
  })(jsPsychModule);
  