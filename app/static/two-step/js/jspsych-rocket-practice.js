
/**
* jspsych-two-step
*
*  @author Sam Zorowitz, Branson Byers, Gili Karni
* plugin to run a practice trial of the first stage of the two-step task
**/

function noenter() {
	  return !(window.event && window.event.keyCode == 13);
	}

var jsPsychRocketPractice = (function (jspsych) {
  'use strict';

  const info = {

    name: "rocket-practice",
    description: '',
    parameters: {

			outcomes: {
				type: jspsych.ParameterType.INT,
				array: true,
				pretty_name: 'Outcomes',
				description: 'Reward outcome for each bandit (reward = 1, no reward = 0)'
			},
      rocket_colors: {
        type: jspsych.ParameterType.HTML_STRING,
        array: true,
        pretty_name: 'Rocket colors',
        description: 'Colors of the state 1 left/right rockets.'
      },
      planet_colors: {
        type: jspsych.ParameterType.HTML_STRING,
        array: true,
        pretty_name: 'Planet colors',
        description: 'Colors of the state 2 planets.'
      },
			valid_responses: {
        type: jspsych.ParameterType.KEYCODE,
        array: true,
        pretty_name: 'Choices',
				default: ['arrowleft', 'arrowright'],
        description: 'The keys the subject is allowed to press to respond to the stimulus.'
      },
			animation: {
				type: jspsych.ParameterType.BOOL,
				pretty_name: 'Animation',
				default: true,
				desscription: 'Display animations during trial (true / false).'
			},

			animation_duration:{
        type: jspsych.ParameterType.INT,
        pretty_name: 'animation duration',
        default: 800,
        description: 'animation duraion.'
      },
			choice_duration: {
        type: jspsych.ParameterType.INT,
        pretty_name: 'Choice duration',
        default: null,
        description: 'How long to listen for responses before trial ends.'
      },
      feedback_duration: {
        type: jspsych.ParameterType.INT,
        pretty_name: 'Trial duration',
        default: 3000,
        description: 'How long to show feedback before it ends.'
      },
      iti_duration: {
        type: jspsych.ParameterType.INT,
        pretty_name: 'Inter-trial interval duration',
        default: 0,
        description: 'How long to hide stimuli on start of trial.'
      },
			randomize: {
        type: jspsych.ParameterType.BOOL,
        pretty_name: 'Randomize',
        default: true,
        description: 'Randomize left/right positions of aliens.'
      },


    }
  };


  class RocketPracticePlugin {
    constructor(jsPsych) {
        this.jsPsych = jsPsych;
    }
    trial(display_element, trial, on_load) {

    //---------------------------------------//
    // Define HTML.
    //---------------------------------------//
    // Define CSS styling.
    var new_html = '';
		var new_html_style ='';

    new_html_style += `<style>
    body {
      height: 100vh;
      max-height: 100vh;
      overflow: hidden;
      position: fixed;
    }
    .jspsych-content-wrapper {
      background: #606060;
      z-index: -1;
    }
		.instructions-box {
      position: absolute;
      bottom: calc(0.60 * var(--height));
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, 0%);
      width: 600px;
      height: 150px;
      background: white;
      border: 2px solid grey;
      border-radius: 12px;
    }
		.instructions {
			position: absolute;
			top: 50%;
			left: 50%;
			-webkit-transform: translate(-50%, -50%);
			transform: translate(-50%, -50%);
			width: 95%;
		}
		.instructions p {
			font-size: 17px;
			line-height: 1.5em;
			margin-block-start: 0.5em;
			margin-block-end: 0.5em;
		}
    </style>`;

		new_html+= new_html_style;
    // Open two-step container.
    new_html += '<div class="two-step-container">';

    // Draw sky & stars.
    new_html += '<div class="landscape-sky" state="1">';
    new_html += '<div class="stars"></div>';
    new_html += '</div>';

		// Draw ground.
	  new_html += '<div class="landscape-ground" stage="1">';
	  new_html += '</div>';

		var state_1_ids = [0,1];
		if ( trial.randomize ) { state_1_ids = jsPsych.randomization.shuffle(state_1_ids); }


		// Draw rockets
		state_1_ids.forEach((j, i) => {
			new_html += `<div class="tower" id="tower-${i}" side="${i}"><div class="arm"></div></div>`;
			new_html += `<div class="platform" id="platform-${i}" side="${i}"></div>`;
			new_html += `<div class="rocket" id="rocket-${i}" state="1" side="${i}">`;
			new_html += '<div class="rocket-body">';
			new_html += `<div class="rocket-window" style="background: ${trial.rocket_colors[j]}"></div>`;
			new_html += '<div class="rocket-studs"></div>';
			new_html += `<div class="rocket-fin" side="0" style="background: ${trial.rocket_colors[j]}"></div>`;
			new_html += `<div class="rocket-fin" side="1" style="background: ${trial.rocket_colors[j]}"></div>`;
			new_html += `<div class="rocket-fire" id="fire-${i}"></div>`;
			new_html += '</div></div>';
		});

    // Close wrapper.
    new_html += '</div>';

    // draw
    display_element.innerHTML = new_html;

    //---------------------------------------//
    // Response handling.
    //---------------------------------------//

		// Preallocate space
    var response = {
      stage_1_key: null,
      stage_1_choice: null,
      stage_1_rt: null,
			outcome: null,
			state_2:null,


    }

		// function to handle missed responses
		var missed_response = function() {

			// Kill all setTimeout handlers.
			jsPsych.pluginAPI.clearAllTimeouts();
			jsPsych.pluginAPI.cancelAllKeyboardResponses();

			// Display warning message.
			const div0 = `<div class="instructions">`;

			const msg = timeouterr;//`<p style="position: absolute; left: 50%; top: 50%; -webkit-transform: translate(-50%, -50%); transform: translate(-50%, -50%); font-size: 20px; line-height: 1.5em; color: white">`+ timeouterr+`</p>`;
			const div1 = `</div>`;

			display_element.innerHTML = new_html_style + div0 + msg + div1;


			jsPsych.pluginAPI.setTimeout(function() {
				end_trial();
			}, 5000);

		}

    // function to handle responses by the subject
    var after_first_response = function(info) {

      // Kill all setTimeout handlers.
      jsPsych.pluginAPI.clearAllTimeouts();
      jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);

      // Log responses.
			response.state_1_rt = info.rt;
			response.state_1_key = trial.valid_responses.indexOf(info.key);
			response.state_1_choice = state_1_ids[response.state_1_key];
			response.outcome = trial.outcomes[response.state_1_choice];
			// Present feedback.
			// state_2_feedback(response.state_2_key, response.outcome)

			// Pause for animation (2s).
			setTimeout(function() { end_trial(); }, trial.feedback_duration );

			if ( trial.animation ) {

				display_element.querySelector('#fire-' + response.state_1_key).style['display'] = 'inherit';
				setTimeout(function() { state_transition(response.state_1_key, response.outcome); }, trial.animation_duration);

			} else {

				state_transition(response.state_1_key, response.outcome);

			}
    };
		var state_transition = function(side, outcome) {

			// Define second state.
			response.state_2 = ( trial.transition == 1 ) ? response.state_1_choice : 1 - response.state_1_choice;

			// Update background.
			display_element.querySelector('.landscape-sky').setAttribute('state', '2');
			display_element.querySelector('.landscape-ground').setAttribute('state', '2');
			display_element.querySelector('.landscape-ground').style['background'] = trial.planet_colors[outcome];

			// Hide rocket elements.
			display_element.querySelector('#platform-0').setAttribute('state', '2');
			display_element.querySelector('#platform-1').setAttribute('state', '2');
			display_element.querySelector('#tower-0').setAttribute('state', '2');
			display_element.querySelector('#tower-1').setAttribute('state', '2');

			// Re-position chosen rocket.
			display_element.querySelector('#rocket-' + side).setAttribute('state', '2');
			display_element.querySelector('#rocket-' + side).setAttribute('side', side);
			display_element.querySelector('#fire-' + side).style['display'] = 'none';
			display_element.querySelector('#rocket-' + (1 - side)).style['display'] = 'none';


			// end trial if no response.
			if (trial.choice_duration !== null) {
				jsPsych.pluginAPI.setTimeout(function() {
					missed_response();
				}, trial.choice_duration);
			}

		};

		var end_trial = function() {

      // kill any remaining setTimeout handlers
      jsPsych.pluginAPI.clearAllTimeouts();

      // kill keyboard listeners
      if (typeof keyboardListener !== 'undefined') {
        jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
      }

      // gather the data to store for the trial
      var trial_data = {
        rocket_colors: trial.rocket_colors,
        planet_colors: trial.planet_colors,
        stage_1_key: response.stage_1_key,
        stage_1_rt: response.stage_1_rt,
        stage_1_choice: response.stage_1_choice,
        //stage_2_key: response.stage_2_key,
        //stage_2_rt: response.stage_2_rt,
        //stage_2_choice: response.stage_2_choice,
        //stage_2_outcome: response.stage_2_outcome,
      };


      // clear the display
      display_element.innerHTML = '';

      // move on to the next trial
      jsPsych.finishTrial(trial_data);
    };

		// hide stimuli during iti
    var keyboardListener = '';
		jsPsych.pluginAPI.setTimeout(function() {
			// unhide stimili
      display_element.querySelector('#rocket-0').style['display'] = 'block';
      display_element.querySelector('#rocket-1').style['display'] = 'block';


	    // start the response listener
	    var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
	      callback_function: after_first_response,
	      valid_responses: trial.valid_responses,
	      rt_method: 'performance',
	      persist: false,
	      allow_held_key: false
	    });
		}, trial.iti_duration);

		// end trial if no response.
		if (trial.choice_duration !== null) {
			jsPsych.pluginAPI.setTimeout(function() {
				missed_response();
			}, trial.choice_duration + trial.iti_duration);
		};

  };

}

  RocketPracticePlugin.info = info;

  return RocketPracticePlugin;

})(jsPsychModule);
