var jsPsychMatchGrid = (function (jspsych) {
    'use strict';
  
    const info = {
      name: 'match-grid',
      parameters: {
        prompt: {
          type: jspsych.ParameterType.STRING,
          pretty_name: 'Prompt',
          default: 'Match the cards!'
        },
        cards: {
          type: jspsych.ParameterType.ARRAY,
          pretty_name: 'Cards',
          default: [],
          description:
            'Array of unique card objects, each with an `entry`, `image`, and `translation` property.'
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
          type: jspsych.ParameterType.ARRAY,
          pretty_name: 'Post Game Buttons',
          default: ['Play Again', 'Home'],
          description:
            'Labels for buttons shown after game completion.'
        }
      }
    };
  
    class MatchGridPlugin {
      constructor(jsPsych) {
        this.jsPsych = jsPsych;
      }
  
      trial(display_element, trial) {
        // Split each card into an image card and a translation card
        let splitCards = [];
        trial.cards.forEach(card => {
          splitCards.push({ entry: card.entry, type: 'image', content: `<img src="${card.image}" style="max-width:100%;max-height:100%;">` });
          splitCards.push({ entry: card.entry, type: 'text', content: `<div>${card.translation}</div>` });
        });
  
        // Shuffle all cards
        splitCards = jsPsych.randomization.shuffle(splitCards);
  
        // Build HTML
        let html = `
          <div class="jspsych-match-grid">
            <p>${trial.prompt}</p>
            <div class="jspsych-match-grid-container"
              style="display:grid;
                     grid-template-columns:repeat(${trial.n_cols},1fr);
                     grid-template-rows:repeat(${trial.n_rows},1fr);
                     gap:10px;
                     justify-items:center;">
        `;
  
        splitCards.forEach((card, i) => {
          html += `
            <div class="jspsych-match-card"
                 data-index="${i}"
                 data-entry="${card.entry}">
              ${card.content}
            </div>`;
        });
  
        html += `</div></div>`;
  
        // Hidden post-game buttons
        html += `
          <div class="jspsych-match-post-buttons"
               style="visibility:hidden;opacity:0;transition:opacity 0.5s;margin-top:20px;text-align:center;">
            ${trial.post_game_buttons
              .map(
                (label, idx) =>
                  `<button class="jspsych-btn" data-btn-index="${idx}">${label}</button>`
              )
              .join('')}
          </div>
        `;
  
        display_element.innerHTML = html;
  
        const cards = display_element.querySelectorAll('.jspsych-match-card');
        const buttonContainer = display_element.querySelector('.jspsych-match-post-buttons');
        let selected = [];
        let matched = [];
        const start_time = performance.now();
  
        cards.forEach(card => {
          card.addEventListener('click', () => {
            const index = parseInt(card.dataset.index);
            if (selected.includes(index) || matched.includes(index)) return;
            selected.push(index);
            card.style.borderColor = '#007bff';
  
            if (selected.length === 2) {
              const [a, b] = selected;
              const first = splitCards[a];
              const second = splitCards[b];
  
              if (first.entry === second.entry && first.type !== second.type) {
                // If the cards match (same entry but different type), mark them as matched
                matched.push(a, b);
                [cards[a], cards[b]].forEach(c => {
                  c.style.borderColor = 'green';
                  c.style.backgroundColor = '#c8f7c5';
                  c.style.cursor = 'default';
                });
              } else {
                // If the cards do not match, briefly show the mismatch and then reset
                [cards[a], cards[b]].forEach(c => (c.style.borderColor = 'red'));
                setTimeout(() => {
                  [cards[a], cards[b]].forEach(c => (c.style.borderColor = '#ccc'));
                }, 600);
              }
              selected = [];
  
              // All pairs matched
              if (matched.length === splitCards.length) {
                const end_time = performance.now();
                const trial_data = {
                  matched_entries: [...new Set(matched.map(i => splitCards[i].entry))],
                  rt: end_time - start_time
                };
  
                buttonContainer.style.visibility = 'visible';
                buttonContainer.style.opacity = '1';
  
                buttonContainer.querySelectorAll('.jspsych-btn').forEach(btn => {
                  btn.addEventListener('click', e => {
                    const btnIndex = parseInt(e.target.getAttribute('data-btn-index'));
                    display_element.innerHTML = '';
                    this.jsPsych.finishTrial({
                      ...trial_data,
                      response: trial.post_game_buttons[btnIndex]
                    });
                  });
                });
              }
            }
          });
        });
      }
    }
  
    MatchGridPlugin.info = info;
    return MatchGridPlugin;
  })(jsPsychModule);
  