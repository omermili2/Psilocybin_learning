/*
* ==============================================================================
*
* Fear Conditioning Task - Custom Plugin
* jsPsych plugin for deploying trials within the fear conditioning task
* Created: Jamie C. Chiu
*
* to 7.2.1 Gili karni
* Date last updated: 11th July 2022
*
* ==============================================================================
*
* How this plugin works:
* - a card is shown face down + flips automatically
* - participant presses key corresponding to stimuli (rt measure)
* - audio sound is revealed as unconditioned stimuli (neutral or aversive)
* - trial ends after sound is played
* - warning is displayed if time lapses without response + trial ends
*
* ==============================================================================
*/

function noenter() {
  return !(window.event && window.event.keyCode == 13);
}

var jsPsychFCtaskTrial = (function (jspsych) {
'use strict';

const info = {

    name: "fctask-trial",
    parameters: {
      // stimuli for CS+
      // stimuli for CS-
      // when to reinforce CS+ (probability or hard-coded array)
      // implicit RT measure, keys to press
      // audio / unconditioned stimulus
      // trial duration
      stimulus_image: {
        type: jspsych.ParameterType.STRING, // BOOL, STRING, INT, FLOAT, FUNCTION, KEY, SELECT, HTML_STRING, IMAGE, AUDIO, VIDEO, OBJECT, COMPLEX
        default: null,
        description: "Stimulus (image) to be shown."
      },
      stimulus_audio: {
        type: jspsych.ParameterType.STRING,
        default: null,
        description: "Audio to be played."
      },
      valid_key: {
        type: jspsych.ParameterType.ARRAY,
        default: 32, // 32 == spacebar 
        description: 'The keys subject has to press to flip card - RT used as implicit measure of aversive learning.'
      },
      response_duration: {
        type: jspsych.ParameterType.INT,
        default: 6000,
        description: 'How long the subject has to make a key press before a warning pops up.'
      },
      card_prompt: {
        type: jspsych.ParameterType.STRING,
        default: null,
        description: "Text to be displayed on top of card."
      },
      background_colour: {
        type: jspsych.ParameterType.STRING,
        default: "MidnightBlue",
        description: "Changes the background colour."
      },
      font_colour: {
        type: jspsych.ParameterType.STRING,
        default: "White",
        description: "Changes the hint font colour."
      },
    },
  };
  


  class FCtaskTrialPlugin {
    constructor(jsPsych) {
        this.jsPsych = jsPsych;
    }
    trial(display_element, trial, on_load) {

    // to control for pacing and flow of trial
    const timeBeforeFlip = 500; // how long card is facedown for
    const transitionDelay = 100; // for the title to change on flip
    const audioDelay = Math.random() * 500; // random delay of <1s
    const timeAfterFlip = 300; // when audio plays after card flips
    const warningDuration = 3000; // how long warning feedback is displayed


    // for storing response
    let response = {
      key: NaN,
      rt: NaN,
      startTime: NaN,
      endTime: NaN,
      timeout: 0,
    };


    // -----------------------------------------------------------------------//
    // Initialising Trial: Define HTML
    // ----------------------------------------------------------------------// 
    
    let new_html = "";

    // insert CSS
    const style = `
      <style>
      .jspsych-display-element {
        background: ${trial.background_colour};
      }
      .jspsych-content-wrapper {
        background: ${trial.background_colour};
      }
      html * {
        color: white;
      }
      p {
        margin-block-start: 0px;
        margin-block-end: 0px;
      }
      body {
        background: ${trial.background_colour};
        overflow-x: hidden;
      }
      </style>
    `;

    new_html += style;

    // create card, face down
    new_html += `
      <div class="trial-container">
        <div class="trial-header">  
          <h1 class="trial-header" id="title-el">
        </div>
        <div class="trial-objects">
          <div class="flip-card" id="flip-card">
            <div class="flip-card-inner">
              <div class="flip-card-front" id="front-card-el">
              <img src="../static/fctask_shared/images/fctask-shared/card-face-back.png" style="width:90%; padding-top: 10px">
              </div>
              <div class="flip-card-back">
                <img src="${trial.stimulus_image}" style="width:80%; padding-top:80px">
                <audio id="audio-el"><source src="${trial.stimulus_audio}">
                </audio>
              </div>
            </div>
          </div>
        </div>  
      </div>
    `;

    // draw card
    display_element.innerHTML = new_html;

    // define constants for getting DOM elements
    let cardEl = document.getElementById("flip-card");
    let frontCardEl = document.getElementById("front-card-el");
    let titleEl = document.getElementById("title-el");
    let borderEl = document.getElementById("flip-card");


    // -----------------------------------------------------------------------//
    // Defining functions
    // ----------------------------------------------------------------------// 

     // function for keyboard listener
     const onKeyPress = function(event) {
      if(event.which == trial.valid_key) {
        response.key = event.which;
        console.log(event.which);
        afterResponse();
      }
    };

    function missedResponse() {
      document.removeEventListener("keydown", onKeyPress);
      response.timeout += 1;
      console.log(response.timeout);
      let msg = " ";
      if (response.timeout > 2) {
        msg = `
          <p style="position: absolute; left: 50%; top: 35%; -webkit-transform: translate(-50%, -50%); transform: translate(-50%, -50%); font-size: 20px; line-height: 1.5em; color: Red">
            !!!!!
            <br><br>אנא תתרכזו בניסוי<br><br>
          </p>
        `;
      } else {
        msg = `
          <p style="position: absolute; left: 50%; top: 35%; -webkit-transform: translate(-50%, -50%); transform: translate(-50%, -50%); font-size: 20px; line-height: 1.5em; color: Red">
          !!
          <br><br>אנא ענו על ידי לחיצה על מקש הרווח<br><br>
        </p>
        `;
      }
      display_element.innerHTML = style + msg;
      setTimeout(() => {
        if (response.timeout > 2) {
          endTrial();
        } else { // continue with trial
          // draw card again
          display_element.innerHTML = new_html;
          // reinitialise all DOM elements
          let cardEl = document.getElementById("flip-card");
          let titleEl = document.getElementById("title-el");
          cardEl.setAttribute("status", "reveal");
          titleEl.style.fontSize = "20px";
          titleEl.style.color = trial.font_colour;
          titleEl.innerHTML = "(אנא ענו על ידי לחיצה על מקש הרווח)";
          document.addEventListener("keydown", onKeyPress);
        }
      }, warningDuration);
    };

    // function to flip card back down
    function returnCard() {
      let cardEl = document.getElementById("flip-card");
      let titleEl = document.getElementById("title-el");
      // initiate flip animation
      cardEl.setAttribute("status", "end");
      titleEl.innerHTML = " ";
    };

    // function for playing audio
    function playAudio() {
      if (trial.stimulus_audio == null) {
        setTimeout(() => {
          returnCard();
        }, 500);
        setTimeout(() => {
          endTrial();
        }, 1300);
      } else {
        const audio = document.getElementById("audio-el");
        console.log(audio.duration)
        setTimeout(() => {
          audio.play();
          console.log( "Sound");
        }, audioDelay);
        setTimeout(() => {
          returnCard();
        }, 500);
        setTimeout(() => {
          endTrial();
        }, 2500);
      }
    }
    
  

    function displayFeedback(){
      let titleEl = document.getElementById("title-el");
      let borderEl = document.getElementById("flip-card");
      // visual feedback, border gets thicker for a moment
      borderEl.style.border = "5px solid slategray";
      titleEl.style.color = "White"; // hides text
      // border resets + sound is played
      setTimeout(() => {
        borderEl.style.border = "0px";
        setTimeout(() => {
          playAudio();
        }, timeAfterFlip);
      }, 500);
      
    };

    // after valid key is pressed
    function afterResponse() {
      // save data
      response.endTime = performance.now();
      response.rt = response.endTime - response.startTime;
      console.log("logged");
      displayFeedback();
      document.removeEventListener("keydown", onKeyPress);
      console.log("key listener stopped");
    };


    // function to flip card
    function revealCard() {
      let cardEl = document.getElementById("flip-card");
      let titleEl = document.getElementById("title-el");
      // save start of response period
      response.startTime = performance.now();
      // initiate flip animation
      cardEl.setAttribute("status", "reveal");
      // update title with transition delay
      setTimeout(function(){
        titleEl.innerHTML = trial.card_prompt;
        titleEl.style.fontSize = "20px";
        titleEl.style.color = trial.font_colour; // hides text
      }, transitionDelay);  
    };

    //------------------------------------------------------------------------//
    // Sequencing of trial
    //------------------------------------------------------------------------//

    // flip card + start keyboard listener
    setTimeout(() => {
      // flip card
      revealCard();
      // start keyboard listener
      document.addEventListener("keydown", onKeyPress);
    }, timeBeforeFlip);

    // start timer for missed response
    const timeoutOne = setTimeout(() => {
      if(isNaN(response.rt)) {
        missedResponse();
      }
    }, trial.response_duration);

     // start timer for missed response
     const timeoutTwo = setTimeout(() => {
      if(isNaN(response.rt)) {
        missedResponse();
      }
    }, trial.response_duration + trial.response_duration + warningDuration);

    // start timer for missed response
    const timeoutThree = setTimeout(() => {
      if(isNaN(response.rt)) {
        missedResponse();
      }
    }, trial.response_duration + trial.response_duration + trial.response_duration + warningDuration + warningDuration);

 
    // end trial

    const endTrial = () => {

      display_element.innerHTML = style;

      this.jsPsych.pluginAPI.clearAllTimeouts();
      clearTimeout(timeoutOne);
      clearTimeout(timeoutTwo);
      clearTimeout(timeoutThree);
      
      // data to be saved
      let trialData = {
        // trial_type: "fc_trial",
        stimulus_image: trial.stimulus_image,
        stimulus_audio: trial.stimulus_audio,
        endTime: response.endTime,
        fc_rt: response.rt,
        fc_key: response.key,
        timeout: response.timeout

      };
      setTimeout(() => {
        
        this.jsPsych.finishTrial(trialData);
      }, 300);
    }

  };

}
FCtaskTrialPlugin.info = info;

return FCtaskTrialPlugin;

})(jsPsychModule);


