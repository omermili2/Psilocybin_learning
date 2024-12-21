/**
* jspsych-mrst-trial
* Sam Zorowitz, Gili Karni
*
* plugin for running a trial of modified risk sensitivity task
*
**/

function noenter() {
	  return !(window.event && window.event.keyCode == 13);
	}

var jsPsychMRSTTrial = (function (jspsych) {
  'use strict';

  const info = {
    name: 'mrst-trial',
    description: '',
    parameters: {
      stimulus: {
        type: jspsych.ParameterType.STRING,
        pretty_name: 'Card stimulus',
        description: 'The stimulus on the face of each card.'
      },
      card_color: {
        type: jspsych.ParameterType.HTML_STRING,
        pretty_name: 'Card color',
        description: 'The color of the back of each card.'
      },
      card_points: {
        type: jspsych.ParameterType.FLOAT,
        pretty_name: 'Card points',
        description: 'The points on the face of each card.'
      },
			certain_points: {
        type: jspsych.ParameterType.FLOAT,
        pretty_name: 'face up points',
        description: 'The points on the face of each card.'
      },
      randomize: {
        type: jspsych.ParameterType.BOOL,
        pretty_name: 'randomize',
        default: true,
        description: 'If true, randomize the left/right position of the cards.'
      },
      valid_responses: {
        type: jspsych.ParameterType.KEYCODE,
        array: true,
        pretty_name: 'Valid responses',
        default: ['arrowright', 'arrowleft'],
        description: 'The keys the subject is allowed to press to respond to the stimulus.'
      },
      choice_duration: {
        type: jspsych.ParameterType.INT,
        pretty_name: 'Trial duration',
        default: null,
        description: 'How long to show trial before it ends.'
      },
      feedback_duration: {
        type: jspsych.ParameterType.INT,
        pretty_name: 'Confirmation duration',
        default: 500,
        description: 'How long to show choice feedback before it ends.'
      },
      outcome_duration: {
        type: jspsych.ParameterType.INT,
        pretty_name: 'Feedback duration',
        default: 1500,
        description: 'How long to show outcome feedback before it ends.'
      }
    }
  }

  class MRSTTrialPlugin {
      constructor(jsPsych) {
          this.jsPsych = jsPsych;
      }
      trial(display_element, trial, on_load) {

    //---------------------------------------//
    // Define HTML.
    //---------------------------------------//

    // Initialize HTML.
    var new_html = '';
		var new_html_style = `<style>
		.jspsych-content-wrapper {
		  background: #808080;
		  background: linear-gradient(to top right, #989898, #606060) fixed;
		}
		.jspsych-content {
		  display: flex;
		  flex-direction: row;
		  justify-content: center;
		  align-items: center;
		  gap: 80px;
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

		new_html += new_html_style;
    // Define mapping of actions to sides.
    var order = [1,0];
    if ( trial.randomize ) { order = this.jsPsych.randomization.shuffle(order); }

    // Iteratively draw cards
    order.forEach((j, i) => {

      // Define constants.
      const face = (j > 0) ? 'down' : 'up';
      const card_color = (j > 0) ? trial.card_color : 'grey';
      const card_points = (j > 0) ? trial.card_points : trial.certain_points;

      // Initialize card container.
      new_html += '<div class="flip-card" id="flip-card-' + j + '" face="' + face + '">';

      // Draw card contents
      new_html += '<div class="flip-card-inner">';

      // Draw face-up side
      new_html += '<div class="flip-card-up">';
      new_html += `<div class="top-left-corner" style="border-top-color: ${card_color}; border-left-color: ${card_color}"></div>`;
      new_html += `<div class="bottom-right-corner" style="border-bottom-color: ${card_color}; border-right-color: ${card_color}"></div>`;
      new_html += '<p id="points">' + card_points + '</p>';
      new_html += '</div>';

      // Draw face-down side
      if (j > 0) {
        new_html += `<div class="flip-card-down" style="background: ${trial.card_color}">`;
        new_html += `<img src="${trial.stimulus}">`;
        new_html += '</div>';
      }

      // Finish card contents
      new_html += '</div>';    // Close flip-card-inner

      // Draw choice indicators
      new_html += '<div class="choice-indicator" id="choice-' + j + '"></div>';

      // Finish card
      new_html += '</div>';    // Close flip-card

    });

    // Draw HTML
    display_element.innerHTML = new_html;

    //---------------------------------------//
    // Response handling.
    //---------------------------------------//

    // confirm screen resolution
    const screen_resolution = [window.innerWidth, window.innerHeight];
    if (screen_resolution[0] < 480 || screen_resolution[1] < 295) {
      var minimum_resolution = 0;
    } else {
      var minimum_resolution = 1;
    }

    // store response
    var response = {
      rt: null,
      key: null,
      choice: null
    };

    // function to handle missed responses
    var missed_response = function() {

      // // Kill all setTimeout handlers.
      jsPsych.pluginAPI.clearAllTimeouts();
      jsPsych.pluginAPI.cancelAllKeyboardResponses();
      
      // Display warning message.
			const div0 = `<div class="instructions">`;

      const msg = timeouterr;//`<p style="position: absolute; left: 50%; top: 50%; -webkit-transform: translate(-50%, -50%); transform: translate(-50%, -50%); font-size: 20px; line-height: 1.5em; color: white">`+ timeouterr+`</p>`;
			const div1 = `</div>`;

      display_element.innerHTML = new_html_style + div0 + msg + div1;

      jsPsych.pluginAPI.setTimeout(end_trial, 2500);

    }

    // function to handle responses by the subject
    var after_response = function(info) {
      
      got_response = true;

      // record responses
      response.rt = info.rt;
      response.key = trial.valid_responses.indexOf(info.key);
      response.choice = order[response.key];

      // compute earnings
      trial.outcome = response.choice * trial.card_points + (1-response.choice) * 5;

      // indicate choice
      document.getElementById('choice-' + response.choice).setAttribute('status', 'select');

      // choice highlight timeout
      jsPsych.pluginAPI.setTimeout(function() {
        present_feedback();
      }, trial.feedback_duration);
      
    }

    // function to handle responses by the subject
    var present_feedback = function(info) {

      // initiate card flip animation.
      document.getElementById('flip-card-1').setAttribute('status', 'feedback');

      // feedback timeout
      jsPsych.pluginAPI.setTimeout(function() {
        end_trial();
      }, trial.outcome_duration);

    };

    // function to end trial when it is time
    var end_trial = function() {

      // Kill any timeout handlers / keyboard listeners
      jsPsych.pluginAPI.clearAllTimeouts();
      jsPsych.pluginAPI.cancelAllKeyboardResponses();
      if (typeof keyboardListener !== 'undefined') {
        jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
      };
      // gather the data to store for the trial
      var trial_data = {
        stimulus: trial.stimulus,
        card_color: trial.card_color,
        card_points: trial.card_points,
        key_press: response.key,
        choice: response.choice,
				accuracy: (trial.outcome == Math.max(trial.card_points, trial.certain_points))*1, // true is accurate
        rt: response.rt,
        outcome: trial.outcome,
        screen_resolution: screen_resolution,
        minimum_resolution: minimum_resolution
      };

      // clear the display
      display_element.innerHTML = '';
      
      // move on to the next trial
      jsPsych.finishTrial(trial_data);
      

    };

    var got_response = false;

    // start the response listener
    var keyboardListener = this.jsPsych.pluginAPI.getKeyboardResponse({
      callback_function: after_response,
      valid_responses: trial.valid_responses,
      rt_method: 'performance',
      persist: false,
      allow_held_key: false
    });

    // end trial if no response.
    if (trial.choice_duration !== null) {
      this.jsPsych.pluginAPI.setTimeout(() => {
        if (got_response == false){
        missed_response();}
      }, trial.choice_duration);
    }

  };
}
  MRSTTrialPlugin.info = info;

  return MRSTTrialPlugin;

})(jsPsychModule);
