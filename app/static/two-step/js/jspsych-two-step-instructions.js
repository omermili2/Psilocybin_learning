/**
* jspsych-pit-instructions
* Sam Zorowitz, Branson Byers, Gili Karni
*
* plugin for running the instructions for the two step task
**/
function noenter() {
	  return !(window.event && window.event.keyCode == 13);
	}

var jsPsychTwoStepInstructions = (function (jspsych) {
  'use strict';

  const info = {
    name: "two-step-instructions",
    description: '',
    parameters: {
      pages: {
				type: jspsych.ParameterType.COMPLEX,
				array: true,
				pretty_name: 'Pages',
				nested: {
					prompt: {
			        type: jspsych.ParameterType.HTML_STRING,
			        pretty_name: 'Pages',
			        array: true,
			        description: 'Each element of the array is the content for a single page.'
			      },
						add_planets: {
						type: jspsych.ParameterType.BOOL,
							pretty_name:'Do or do not draw planets?',
							default: false,
							description: 'Decides if planets appear on this instructions slide.'
						},
			      add_aliens: {
							type: jspsych.ParameterType.BOOL,
			        pretty_name:'Do or do not draw aliens?',
							default: false,
			        description: 'Decides if aliens appear on this instructions slide.'
			      },
			      add_diamonds: {
							type: jspsych.ParameterType.BOOL,
			        pretty_name:'Do or do not draw diamonds?',
							default: false,
			        description: 'Decides if diamonds appear on this instructions slide.'
			      },
			      add_rocks: {
			        type: jspsych.ParameterType.BOOL,
			        pretty_name:'Do or do not draw rocks?',
							default: false,
			        description: 'Decides if rocks appear on this instructions slide.'
			      },
			      add_rockets: {
			        type: jspsych.ParameterType.BOOL,
			        pretty_name:'Show the rockets. ',
							default: false,
			        description: 'Decides if the rockets appear on this instructions slide.'
			      },
						view_duration: {
							type: jspsych.ParameterType.INT,
							pretty_name: 'View duration',
							default: null,
							description: 'How long to show instructions before next is clickable.'
						},
						audio: {
							type: jspsych.ParameterType.AUDIO,
							pretty_name: 'Audio',
							default: null,
							description: 'Audio file reading the text on the page.'
						},
					}
				},
				rocket_colors: {
					type: jspsych.ParameterType.HTML_STRING,
					array: true,
					default: ['#a75248','#486ea7'],
					pretty_name: 'Rocket colors',
					description: 'Colors of the state 1 left/right rockets (red, blue, green, purple)'
				},
				planet_colors:
				{
					type: jspsych.ParameterType.HTML_STRING,
					array: true,
					default: ['#5b7c65','#706081'],
					pretty_name: 'planet colors',
					description: 'Colors of the instructions planet (red, blue, green, purple)'
				},
				aliens: {
					type: jspsych.ParameterType.HTML_STRING,
					pretty_name: 'Aliens',
					default: null,
					description: 'Paths to alien images'
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
				default:  ['Previous','Next'],
				description: 'Label of the buttons.'
			},
			left_to_right:{
				type: jspsych.ParameterType.BOOL,
				pretty_name: 'reading dir',
				default:  true,
				description: 'left to right OR right to left',
			},

    }
  };

  class TwoStepInstructionsPlugin {
    constructor(jsPsych) {
        this.jsPsych = jsPsych;
    }
    trial(display_element, trial, on_load) {


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
    //---------------------------------------//
    // Section 1: Define HTML.
    //---------------------------------------//

    // Define CSS styling.
    var new_html = '';
    new_html += `<style>
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
    .jspsych-instructions-nav {
      position: absolute;
      bottom: 0%;
      left: 50%;
      -webkit-transform: translate(-50%, 0%);
      transform: translate(-50%, 0%);
      padding: 10px 0px;
    }
    .jspsych-instructions-nav .jspsych-btn {
      padding: 4px 12px;
      font-size: 15px;
    }
    .jspsych-instructions-nav .jspsych-btn:focus {
      outline: none;
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
    .alien[state='instructions'] {
      bottom: 10%;
      width: calc(0.23 * var(--width));
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
    }
    .alien[state='instructions'][side='0'] {
      left: calc(50% - 0.38 * var(--width));
    }
    .alien[state='instructions'][side='1'] {
      left: calc(50% - 0.13 * var(--width));
    }
    .alien[state='instructions'][side='2'] {
      left: calc(50% + 0.13 * var(--width));
    }
    .alien[state='instructions'][side='3'] {
      left: calc(50% + 0.38 * var(--width));
    }
    .diamond[state='instructions'], .rock[state='instructions'] {
      display: inherit;
      width: calc(0.20 * var(--width));
      height: calc(0.20 * var(--width));
      left: 50%;
      bottom: 30%;
      -webkit-transform: translate(-50%, 50%);
      transform: translate(-50%, 50%);
    }
    </style>`;

    // Start two-step wrapper.
    new_html += '<div class="two-step-container">';

    // Draw sky & stars
    new_html += '<div class="landscape-sky" state="1"><div class="stars"></div>';

    // Finish sky.
    new_html += '</div>';

    // Draw ground.
    new_html += '<div class="landscape-ground" state="1"></div>';

    // Draw rockets.
    new_html += '<div id="rockets">';
    for (let i=0; i<2; i++) {
      new_html += `<div class="tower" side="${i}"><div class="arm"></div></div>`;
      new_html += `<div class="platform" side="${i}"></div>`;
      new_html += `<div class="rocket" state="1" side="${i}">`;
      new_html += '<div class="rocket-body">';
      new_html += `<div class="rocket-window" style="background: ${trial.rocket_colors[i]}"></div>`;
      new_html += '<div class="rocket-studs"></div>';
      new_html += `<div class="rocket-fin" side="0" style="background: ${trial.rocket_colors[i]}"></div>`;
      new_html += `<div class="rocket-fin" side="1" style="background: ${trial.rocket_colors[i]}"></div>`;
      new_html += `<div class="rocket-fire" id="fire-${i}"></div>`;
      new_html += '</div></div>';
    }
    new_html += '</div>';

		// Draw planets.

		new_html += '<div id="moons">';
		for (let i=0; i<2; i++) {
			new_html += `<div class="moon" side="${i}" style="background: ${trial.planet_colors[i]}">`;
			new_html += '<div class="shadow"></div>';
			new_html += '<div class="crater"></div>';
			new_html += '</div>';

			// Draw right planet.
		// 	new_html += `<div class="moon" id="moon-R" side="right" style="background:${trial.planet_colors[1]}">`;
		// 	new_html += '<div class="shadow"></div>';
		// 	new_html += '<div class="crater"></div>';
		// 	new_html += '</div>';
		}
		new_html += '</div>';
    // Draw one/two/four aliens.
		new_html += '<div id="aliens_1">';
    new_html += `<div class="alien" state="instructions" side="0">`;
    new_html += `<img src="${trial.aliens[0]}"></img>`;
    new_html += '</div>';

    new_html += '</div>';

    new_html += '<div id="aliens_2">';
    for (let i=0; i<2; i++) {
      new_html += `<div class="alien" state="instructions" side="${i}">`;
      new_html += `<img src="${trial.aliens[i]}"></img>`;
      new_html += '</div>';
    }
    new_html += '</div>';

		new_html += '<div id="aliens_4">';
    for (let i=0; i<4; i++) {
      new_html += `<div class="alien" state="instructions" side="${i}">`;
      // new_html += `<img src="${trial.pages[current_page].aliens[i]}"></img>`;
      new_html += '</div>';
    }
    new_html += '</div>';

    // Draw diamonds.
    new_html += '<div class="diamond" id="diamond" state="instructions"></div>';

    // Draw rocks.
    new_html += '<div class="rock" id="rock" state="instructions"></div>';

    // Draw instructions
    new_html += '<div class="instructions-box"><div class="instructions"></div></div>';




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

    // Draw buttons


		var transforms = [ "-webkit-transform: translateX(-100%); transform: translateX(-100%)", //left
											"-webkit-transform: translateX(0%); transform: translateX(0%)"] //right
		var arrows = ["&gt;", "&lt;"]


		if (trial.left_to_right==false){
			transforms.reverse()
			arrows.reverse()
		}
    new_html += '<div class="jspsych-instructions-nav">';
		new_html += `<button id="jspsych-instructions-next" class="jspsych-btn" style="position: absolute; left: 45%; bottom: 8%; ${transforms[1]}"> ${arrows[1]} ${trial.button_labels[1]} ${arrows[1]} </button>`;
    new_html += `<button id="jspsych-instructions-back" class="jspsych-btn" style="position: absolute; left: 55%; bottom: 8%; ${transforms[0]}"> ${arrows[0]} ${trial.button_labels[0]} ${arrows[0]} </button>`;
		new_html += '</div>';

    // Close
    new_html += '</div>';

    display_element.innerHTML = new_html;

    //---------------------------------------//
    // Section 2: Response handling.
    //---------------------------------------//


      // Update instructions text.
      display_element.querySelector('.instructions').innerHTML = `<p>${trial.pages[current_page].prompt}</p>`;

      // Update prev button
      if (current_page != 0) {
        display_element.querySelector('#jspsych-instructions-back').disabled = false;
        display_element.querySelector('#jspsych-instructions-back').addEventListener('click', btnListener);
      } else {
        display_element.querySelector('#jspsych-instructions-back').disabled = true;
      }
			display_element.querySelector('#jspsych-instructions-next').disabled = true;

			// Update next button
			setTimeout(function(){ document.getElementById('jspsych-instructions-next').disabled=false}, trial.pages[current_page].view_duration);

			display_element.querySelector('#jspsych-instructions-next').addEventListener('click', btnListener);


      // Update next button
      display_element.querySelector('#jspsych-instructions-next').addEventListener('click', btnListener);
			if (trial.pages[current_page].add_aliens == 1) {
				display_element.querySelector('#aliens_1').style.display = "block";
				display_element.querySelector('#aliens_2').style.display = "none";
				display_element.querySelector('#aliens_4').style.display = "none";
      } else if (trial.pages[current_page].add_aliens == 2) {
        display_element.querySelector('#aliens_2').style.display = "block";
				display_element.querySelector('#aliens_4').style.display = "none";
				display_element.querySelector('#aliens_1').style.display = "none";
      } else if (trial.pages[current_page].add_aliens == 4) {
        display_element.querySelector('#aliens_4').style.display = "block";
				display_element.querySelector('#aliens_2').style.display = "none";
				display_element.querySelector('#aliens_1').style.display = "none";

      } else {
				display_element.querySelector('#aliens_2').style.display = "none";
				display_element.querySelector('#aliens_4').style.display = "none";
				display_element.querySelector('#aliens_1').style.display = "none";


			}
			// Update task elements
      if (trial.pages[current_page].add_planets) {
        display_element.querySelector('#moons').style.display = "block";
      } else {
        display_element.querySelector('#moons').style.display = "none";
      }


      if (trial.pages[current_page].add_diamonds) {
        display_element.querySelector('#diamond').style.display = "block";
      } else {
        display_element.querySelector('#diamond').style.display = "none";
      }

      if (trial.pages[current_page].add_rocks) {
        display_element.querySelector('#rock').style.display = "block";
      } else {
        display_element.querySelector('#rock').style.display = "none";
      }

      if (trial.pages[current_page].add_rockets) {
        display_element.querySelector('#rockets').style.display = "block";
      } else {
        display_element.querySelector('#rockets').style.display = "none";
      }

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
TwoStepInstructionsPlugin.info = info;

return TwoStepInstructionsPlugin;

})(jsPsychModule);
