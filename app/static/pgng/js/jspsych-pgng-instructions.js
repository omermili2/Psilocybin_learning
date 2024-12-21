/**
 * jspsych-pgng-instructions
 * Sam Zorowitz, Gili Karni
 *
 * plugin for running the instructions for the Pavlovian go/no-go task
 *
 **/

 function noenter() {
 	  return !(window.event && window.event.keyCode == 13);
 	}

 var jsPsychPgngInstructions = (function (jspsych) {
   'use strict';

   const info = {
    name:  'pgng-instructions',
    description: '',
    parameters: {
      pages: {
        type: jspsych.ParameterType.COMPLEX,
        array: true,
        pretty_name: 'Pages',
        nested: {
          prompt: {
          type: jspsych.ParameterType.HTML_STRING,
          pretty_name: 'prompt',
          default: undefined,
          array: true,
          description: 'Each element of the array is the content for a single page.'
                    },
          robot_runes: {
            type: jspsych.ParameterType.STRING,
            pretty_name: 'Robot rune',
            array: true,
            default: [],
            description: 'Filenames of rune images in static folder. Should be same length as pages.'
          },
          scanner_colors: {
            type: jspsych.ParameterType.HTML_STRING,
            pretty_name: 'Scanner color',
            array: true,
            default: [],
            description: 'Color of scanner light. Should be same length as pages.'
          },
          view_duration: {
            type: jspsych.ParameterType.INT,
            pretty_name: 'instrution reading time- review duration',
            default: null,
            description: 'How long before next button becomes avaliable.'
          },
          audio: {
              type: jspsych.ParameterType.AUDIO,
              pretty_name: "audio instructions",
              default: null,
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
  }

  class PgngInstructionsPlugin {
      constructor(jsPsych) {
          this.jsPsych = jsPsych;
      }
      trial(display_element, trial, on_load) {

    //---------------------------------------//
    // Define HTML.
    //---------------------------------------//


    // Initialize variables.
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

    // Initialize HTML.
    var new_html = `<style>
    body {
      background: -webkit-gradient(linear, left bottom, left top, from(#808080), color-stop(50%, #606060), color-stop(50%, rgba(28, 25, 23, 0.5)), to(rgba(179, 230, 230, 0.5)));
      background: linear-gradient(0deg, #808080 0%, #606060 50%, #A0A0A0 50%, #D3D3D3 100%);
      height: 100vh;
      max-height: 100vh;
      overflow: hidden;
      position: fixed;
    }
    .jspsych-content-wrapper {
      overflow: hidden;
    }
    .conveyor:after {
      -webkit-animation: none;
      animation: none;
    }
    </style>`;


    // Add robot factor wrapper.
    new_html += '<div class="factory-wrap">';

    // Add factory machine parts (back).
    new_html += '<div class="machine-back"></div>';
    new_html += '<div class="conveyor"></div>';
    new_html += '<div class="shadows"></div>';

    // Add robot 1 (active).
    new_html += '<div class="robot">';
    new_html += '<div class="antenna"></div>';
    new_html += '<div class="head"></div>';
    new_html += '<div class="torso">';
    new_html += '<div class="left"></div>';
    new_html += '<div class="right"></div>';
    new_html += `<div class="rune" set="elianto"><p id="rune" style="animation: none; -webkit-animation: none;"></p></div>`;
    new_html += '</div>';
    new_html += '<div class="foot"></div>';
    new_html += '</div>';

    // Add factory window.
    new_html += `<div class="scanner-light" style="animation: none; -webkit-animation: none;"></div>`;

    // Add factory machine parts (front).
    new_html += '<div class="machine-front">';
    new_html += '<div class="score-container"></div>';


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

    new_html += '<div class="jspsych-instructions-nav">';
    new_html += `<button id="jspsych-instructions-back" class="jspsych-btn" style="margin-${side[0]}: 5px;"> ${arrows[0]} ${trial.button_labels[0]} ${arrows[0]} </button>`;
    new_html += `<button id="jspsych-instructions-next" class="jspsych-btn" style="margin-${side[1]}: 5px;"> ${arrows[1]} ${trial.button_labels[1]} ${arrows[1]} </button>`;

    new_html += '</div>';

    new_html += '</div>';


    new_html += '<div class="machine-top"></div>';

    // Draw instructions
    new_html += '<div class="instructions-box"><div class="instructions"></div></div>';

    // Close wrapper
    new_html += '</div>';

    // draw
    display_element.innerHTML = new_html;





    //---------------------------------------//
    // Task functions.
    //---------------------------------------//



    // Prepare robot runes.
    var robot_runes = [];
    for (var i=0; i<trial.pages.length; i++){
      robot_runes.push( trial.pages[i].robot_runes == undefined ? '' : trial.pages[i].robot_runes );
    }

    // Initialize scanner colors.
    var scanner_colors = [];
    for (var i=0; i<trial.pages.length; i++){
      scanner_colors.push( trial.pages[i].scanner_colors == undefined ? '#FFFFFF00' : trial.pages[i].scanner_colors );
    }





      // Update instructions text.
      display_element.querySelector('.instructions').innerHTML = `<p>${trial.pages[current_page].prompt}</p>`;

      // Update robot rune.
      document.getElementById("rune").innerHTML = robot_runes[current_page];

      // Update scanner color.
      display_element.querySelector('.scanner-light').style['border-bottom-color'] = scanner_colors[current_page];

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
PgngInstructionsPlugin.info = info;

return PgngInstructionsPlugin;

})(jsPsychModule);
