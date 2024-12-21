/**
 * jspsych-two-step-comprehension
 * Sam Zorowitz
 *
 * plugin for running the comprehension check for the two-step task
 *
 **/

 function noenter() {
 	  return !(window.event && window.event.keyCode == 13);
 	}

 var jsPsychTwoStepComprehension = (function (jspsych) {
   'use strict';

   const info = {
    name: "two-step-comprehension'",
    description: '',
    parameters: {
      prompts: {
        type: jspsych.ParameterType.HTML_STRING,
        array: true,
        pretty_name: 'Prompts',
        description: 'Comprehension check questions'
      },
      options: {
        type: jspsych.ParameterType.HTML_STRING,
        array: true,
        pretty_name: 'Options',
        description: 'Comprehension check question options'
      },
      correct: {
        type: jspsych.ParameterType.STRING,
        array: true,
        pretty_name: 'Correct',
        description: 'Answers to comprehension check questions'
      },
      button_label: {
        type: jspsych.ParameterType.STRING,
        pretty_name: 'Button label',
        default:  'Continue',
        description: 'Label of the button.'
      },
      left_to_right:{
        type: jspsych.ParameterType.BOOL,
        pretty_name: 'reading dir',
        default:  true,
        description: 'left to right OR right to left',
      }
    }
  }


  class TwoStepComprehensionPlugin {
      constructor(jsPsych) {
          this.jsPsych = jsPsych;
      }
      trial(display_element, trial, on_load) {


    // Plug-in setup
    var plugin_id_name = "jspsych-survey-multi-choice";
    var plugin_id_selector = '#' + plugin_id_name;

    var _join = function() {
      var arr = Array.prototype.slice.call(arguments, _join.length);
      return arr.join(separator = '-');
    };

    // ---------------------------------- //
    // Section 1: Define HTML             //
    // ---------------------------------- //

    // Define CSS styling.
    var html = '';

    html += `<style>
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
    .comprehension-box {
      padding: 10px 12px;
      position: absolute;
      top: 50%;
      left: 50%;
      -webkit-transform: translate3d(-50%, -50%, 0);
      transform: translate3d(-50%, -50%, 0);
      width: 600px;
      height: 350px;
      background: #ffffff;
      border: 2px solid black;
      border-radius: 12px;
      font-size: 16px;
      line-height: 1.5em;
    }

    .comprehension-box .jspsych-survey-multi-choice-preamble h4 {
      font-size: 18px;
      margin-block-start: 1em;
      margin-block-end: 1.2em
      padding-left: 2em;
      padding-right: 2em;
    }
    .comprehension-box .jspsych-survey-multi-choice-question {
      margin-top: 0em;
      margin-bottom: 1.0em;
      padding-left: 2em;
      padding-right: 2em;

    }
    .comprehension-box .jspsych-survey-multi-choice-horizontal .jspsych-survey-multi-choice-text {
      margin: 0em 0em 0em 0em
    }
    .comprehension-box .jspsych-survey-multi-choice-horizontal .jspsych-survey-multi-choice-option {
      display: inline-block;
      margin: 0.33em 1em 0em 1em;
    }
    .comprehension-box .jspsych-survey-multi-choice-option input[type='radio'] {
      margin-right: 0.5em;
      width: 16px;
      height: 14px;
    }
    .comprehension-box input[type='submit'] {
      position: absolute;
      top: 95%;
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      font-size: 16px;
      padding: 4px 8px;
    }
    </style>`;

    // Draw background
    html += '<div class="two-step-container">';
    html += '<div class="landscape-sky" state="1"><div class="stars"></div></div>';
    html += '<div class="landscape-ground" state="1"></div>';

    // form element
    var trial_form_id = plugin_id_name+"form";//_join(plugin_id_name, "form");
    display_element.innerHTML += '<form id="'+trial_form_id+'"></form>';

    if (trial.left_to_right){
      var text_align ="left" ;
      var text_direction="ltr";}
    else{
      var text_align ="right";
      var text_direction="rtl";
    }

    // Show preamble text
    html += `<div class="comprehension-box" style="text-align:${text_align}">`;
    html += `<div class="jspsych-survey-multi-choice-preamble" style="text-align:${text_align}">${quiz_00}</div>`;

    // Initialize form element
    html += `<form id="jspsych-survey-multi-choice-form" style="text-align:${text_align};">`;

    // Iteratively add comprehension questions.
    for (let i = 0; i < trial.prompts.length; i++) {

      // Initialize item
      html += `<div id="jspsych-survey-multi-choice-${i}" class="jspsych-survey-multi-choice-question jspsych-survey-multi-choice-horizontal" data-name="Q${i}" style="text-align:${text_align};">`;

      // Add question text
      html += `<p class="jspsych-survey-multi-choice-text survey-multi-choice">${trial.prompts[i]}</p>`;

      // Iteratively add options.
      for (let j = 0; j < trial.options[i].length; j++) {

        // Option 1: True
        html += `<div id="jspsych-survey-multi-choice-option-${i}-${j}" class="jspsych-survey-multi-choice-option" style="text-align:${text_align}; direction:${text_direction};">`;
        html += `<input type="radio" name="jspsych-survey-multi-choice-response-${i}" id="jspsych-survey-multi-choice-response-${i}-${j}" value="${trial.options[i][j]}" style="text-align:${text_align};" required>`;
        html += `<label class="jspsych-survey-multi-choice-text" for="jspsych-survey-multi-choice-response-${i}-${j}">${trial.options[i][j]}</label>`;
        html += '</div>';

      }

      // Close item
      html += '<br></div>';

    }

    // add submit button
    html += '<input type="submit" id="'+plugin_id_name+'-next" class="'+plugin_id_name+' jspsych-btn"' + (trial.button_label ? ' value="'+trial.button_label + '"': '') + '"></input>';

    // End HTML
    html += '</form>';
    html += '</div>';
    html += '</div>';

    // Display HTML
    display_element.innerHTML = html;

    // ---------------------------------- //
    // Section 2: jsPsych Functions       //
    // ---------------------------------- //

    // Detect submit button press
    document.querySelector('form').addEventListener('submit', function(event) {
      event.preventDefault();

      // Measure response time
      var endTime = performance.now();
      var response_time = endTime - startTime;

      // Gather responses
      var responses = [];
      var num_errors = 0;
      for (var i=0; i<trial.prompts.length; i++) {

        // Find matching question.
        var match = display_element.querySelector('#jspsych-survey-multi-choice-'+i);
        var val = match.querySelector("input[type=radio]:checked").value;

        // Store response
        responses.push(val)

        // Check accuracy
        if ( trial.correct[i] != val ) {
          num_errors++;
        }

      }

      // store data
      var trial_data = {
        "responses": responses,
        "num_errors": num_errors,
        "rt": response_time
      };

      // clear html
      display_element.innerHTML += '';

      // next trial
      jsPsych.finishTrial(trial_data);

    });

    var startTime = performance.now();
  };

}
  TwoStepComprehensionPlugin.info = info;

  return TwoStepComprehensionPlugin;

  })(jsPsychModule);
