/**
* jspsych-mrst-instructions
* Sam Zorowitz, Branson Byers, Gili Karni
*
* plugin for running the instructions for the mrst
**/
function noenter() {
	  return !(window.event && window.event.keyCode == 13);
	}

var jsPsychMRSTInstructions = (function (jspsych) {
  'use strict';

  const info = {
    name: "MRST-instructions",
    description: '',
    parameters: {
			pages: {
        type: jspsych.ParameterType.COMPLEX,
        array: true,
        pretty_name: 'Pages',
        nested: {
          prompt: {
            type: jspsych.ParameterType.STRING,
            pretty_name: 'Prompt',
            default: undefined,
            description: 'Instructions text for the page.'
          },
          img: {
            type: jspsych.ParameterType.HTML_STRING,
            pretty_name: 'Stock color',
            default: null,
            description: 'Hex code for the stock color.'
          },
          audio: {
            type: jspsych.ParameterType.AUDIO,
            pretty_name: 'Audio',
            default: null,
            description: 'Audio file reading the text on the page.'
          },
          show_cards: {
            type: jspsych.ParameterType.BOOL,
            pretty_name: 'Show cards',
            default: false,
            description: 'If true, show the card stimuli.'
          },
          stimulus: {
            type: jspsych.ParameterType.HTML_STRING,
            pretty_name: 'Card picture',
            default: '../static/mrst/img/animals/bird-crane-shape.svg',
            description: 'The picture for the face-down card.'
          },
          card_color: {
            type: jspsych.ParameterType.HTML_STRING,
            pretty_name: 'Card color',
            default: '#3d85c690',
            description: 'The color for the face-down card.'
          },
          card_points: {
            type: jspsych.ParameterType.FLOAT,
            pretty_name: 'Points',
            default: '10',
            description: 'The number of points on the back of the face-down card.'
          },
					certain_points: {
            type: jspsych.ParameterType.FLOAT,
            pretty_name: 'Points',
            default: '5',
            description: 'The number of points on the back of the face-down card.'
          },
          face: {
            type: jspsych.ParameterType.FLOAT,
            pretty_name: 'Face',
            default: 'down',
            description: 'The face direction of the card ("down", "up").'
          },
          choice: {
            type: jspsych.ParameterType.INT,
            pretty_name: 'Phase',
            default: null,
            description: 'Phase of trial (hide = -1, choice = 0, feedback = 1).'
          },
          view_duration: {
            type: jspsych.ParameterType.INT,
            pretty_name: 'View duration',
            default: null,
            description: 'How long to show instructions before next is clickable.'
          }
        }
			},
      key_forward: {
        type: jspsych.ParameterType.KEYCODE,
        pretty_name: 'Key forward',
        default: 'ArrowRight',
        description: 'The key the subject can press in order to advance to the next page.'
      },
      key_backward: {
        type: jspsych.ParameterType.KEYCODE,
        pretty_name: 'Key backward',
        default: 'ArrowLeft',
        description: 'The key that the subject can press to return to the previous page.'
      },
			button_labels:{
				type: jspsych.ParameterType.STRING,
				pretty_name: 'Button label prev and next',
				default:  ['Previous', 'Next'],
				description: 'Label of the buttons.'
			},
			left_to_right:{
				type: jspsych.ParameterType.BOOL,
				pretty_name: 'reading dir',
				default:  true,
				description: 'left to right OR right to left',
			}
    }
	}

  class MRSTInstructionsPlugin {
    constructor(jsPsych) {
        this.jsPsych = jsPsych;
    }
    trial(display_element, trial, on_load) {

		//---------------------------------------//
    // Define parameters.
    //---------------------------------------//

    var current_page = 0;
    var view_history = [];
    var start_time = performance.now();
    var last_page_update_time = start_time;


		function btnListener(evt){
      evt.target.removeEventListener('click', btnListener);
      if(this.id === "jspsych-instructions-back"){
        back();
      }
      else if(this.id === 'jspsych-instructions-next'){
        next();
      }
    }

		function show_current_page() {

			// Initialize html.
			var html = "";

			// HACK: adjust stimuli scale
      const scale = 0.8;

			// Add CSS.
			// Insert CSS.
      const style = `<style>
      .jspsych-content-wrapper {
        background: #808080;
      }
      .jspsych-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      p {
        margin-block-start: 0px;
        margin-block-end: 0px;
      }
      .task-content {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 80px;
      }
      .flip-card .choice-indicator {
        top: calc(100% + 10px);
        visibility: visible;
        border-bottom-color: #D3D3D3;
      }
      .instructions {

        position: relative;
        width: 650px;
        height: 150px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        margin: 25px 20px 25px 20px;
        background: white;
        border: 2px solid black;
        border-radius: 12px;

      }
      .instructions p {
        font-size: 18px;
        line-height: 1.4em;
        margin: 10px;
      }
      .instructions p:last-of-type {
        margin-bottom: 0px;
      }
      </style>`;

			html += style;


			if (trial.pages[current_page].show_cards) {

        // Define wrapper
        html += '<div class="task-content">';

        // Define mapping of actions to sides.
        var order = [0,1];

        // Iteratively draw cards
        order.forEach((j, i) => {

          // Define constants.
          const face = (j > 0) ? trial.pages[current_page].face : 'up';
          const card_color = (j > 0) ? trial.pages[current_page].card_color : 'grey';
          const card_points = (j > 0) ? trial.pages[current_page].card_points : trial.pages[current_page].certain_points;

          // Initialize card container.
          html += '<div class="flip-card" id="flip-card-' + j + '" face="' + face + '">';

          // Draw card contents
          html += '<div class="flip-card-inner">';

          // Draw face-up side
          html += '<div class="flip-card-up">';
          html += `<div class="top-left-corner" style="border-top-color: ${card_color}; border-left-color: ${card_color}"></div>`;
          html += `<div class="bottom-right-corner" style="border-bottom-color: ${card_color}; border-right-color: ${card_color}"></div>`;
          html += '<p id="points">' + card_points + '</p>';
          html += '</div>';

          // Draw face-down side
          if (j > 0) {
            html += `<div class="flip-card-down" style="background: ${card_color}">`;
            html += `<img src="${trial.pages[current_page].stimulus}">`;
            html += '</div>';
          }

          // Finish card contents
          html += '</div>';    // Close flip-card-inner

          // Draw choice indicators
          trial.pages[current_page].choice
          if (trial.pages[current_page].choice == j) {
            html += '<div class="choice-indicator"></div>';
          }

          // Finish card
          html += '</div>';    // Close flip-card

        });

				html += '</div>';

      };

			// Draw image
      if (trial.pages[current_page].img != null) {
        html += '<img src="' + trial.pages[current_page].img + '" style="max-width: 600px">';
      }

			// Draw prompt
      html += `<div class="instructions">`;
      html += trial.pages[current_page].prompt;
      html += '</div>';

			var context = jsPsych.pluginAPI.audioContext();

			if (current_page > -1 && trial.pages[current_page].audio!=null) {
					jsPsych.pluginAPI.getAudioBuffer(trial.pages[current_page].audio)
					 .then(function(buffer){
					if (context !== null) {
					 var audio = context.createBufferSource();
					 audio.buffer = buffer;
					 audio.connect(context.destination);
					 audio.start(context.currentTime);


				 } else {
					 var audio = buffer;
					 audio.currentTime = 0;
					 audio.play();

				 }
				 })
				 .catch(function(err){
					 console.error('Audio file failed to load')
				})};


			var side = [ "left", "right"]
			var arrows = ["&gt;", "&lt;"]


			if (trial.left_to_right==false){
				side.reverse()
				arrows.reverse()
			}

			var allowed = (current_page > 0)? '' : "disabled='disabled'";

			// Add instructions navigation.

			html += '<div class="jspsych-instructions-nav">';
			html += `<button id="jspsych-instructions-back" class="jspsych-btn" style="margin-${side[0]}: 5px;"  ${allowed}> ${arrows[0]} ${trial.button_labels[0]} ${arrows[0]} </button>`;
	    html += `<button id="jspsych-instructions-next" class="jspsych-btn" style="margin-${side[1]}: 5px;"> ${arrows[1]} ${trial.button_labels[1]} ${arrows[1]} </button>`;

	    html += '</div>';
			// html += '</div>';



			// draw HTML
			display_element.innerHTML = html;

			// Enable backwards navigation.
			if (current_page != 0) {
				display_element.querySelector('#jspsych-instructions-back').addEventListener('click', btnListener);
			}

			// Enable forwards navigation.
			// Update next button
			display_element.querySelector('#jspsych-instructions-next').disabled = true;

			var timeout = 0;



			setTimeout(function(){ document.getElementById('jspsych-instructions-next').disabled=false}, trial.pages[current_page].view_duration );
			display_element.querySelector('#jspsych-instructions-next').addEventListener('click', btnListener);


		}




	function next() {

		add_current_page_to_view_history()

		current_page++;

		// if done, finish up...
		if (current_page >= trial.pages.length) {
			endTrial();
		} else {
			show_current_page();
		}

	}

	function back() {

		add_current_page_to_view_history()

		current_page--;

		show_current_page();
	}

	function add_current_page_to_view_history() {

		var current_time = performance.now();

		var page_view_time = current_time - last_page_update_time;

		view_history.push({
			page_index: current_page,
			viewing_time: page_view_time
		});

		last_page_update_time = current_time;
	}

	function endTrial() {

		jsPsych.pluginAPI.cancelKeyboardResponse(keyboard_listener);


		display_element.innerHTML = '';

		var trial_data = {
			"view_history": JSON.stringify(view_history),
			"rt": performance.now() - start_time
		};

		jsPsych.finishTrial(trial_data);
	}

	var after_response = function(info) {

		// have to reinitialize this instead of letting it persist to prevent accidental skips of pages by holding down keys too long
		keyboard_listener = jsPsych.pluginAPI.getKeyboardResponse({
			callback_function: after_response,
			valid_responses: [trial.key_forward, trial.key_backward],
			rt_method: 'performance',
			persist: false,
			allow_held_key: false
		});
		// check if key is forwards or backwards and update page
		if (jsPsych.pluginAPI.compareKeys(info.key, trial.key_backward)) {
			if (current_page !== 0) {
				back();
			}
		}

		if (jsPsych.pluginAPI.compareKeys(info.key, trial.key_forward)) {
			next();
		}

	};

	show_current_page();

	var keyboard_listener = jsPsych.pluginAPI.getKeyboardResponse({
		callback_function: after_response,
		valid_responses: [trial.key_forward, trial.key_backward],
		rt_method: 'performance',
		persist: false
	});

};
}
MRSTInstructionsPlugin.info = info;

return MRSTInstructionsPlugin;

})(jsPsychModule);
