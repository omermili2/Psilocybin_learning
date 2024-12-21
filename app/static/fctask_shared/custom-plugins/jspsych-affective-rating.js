/*
* Affective Rating
*
* Author(s): Jamie Chiu
* to 7.2.1 Gili Karni
*
* Inspired by:
* Purves, K. L., et al. “Validating the Use of a Smartphone App for Remote
* Administration of a Fear Conditioning Paradigm.” Behaviour Research and
* Therapy, vol. 123, 2019, p. 103475.
*
* 
*/


function noenter() {
  return !(window.event && window.event.keyCode == 13);
}

var jsPsychAffectiveRating = (function (jspsych) {
'use strict';

const info = {
    name: "affective-rating",
    parameters: {
      CSimage: {
        type: jspsych.ParameterType.STRING, // BOOL, STRING, INT, FLOAT, FUNCTION, KEY, SELECT, HTML_STRING, IMAGE, AUDIO, VIDEO, OBJECT, COMPLEX
        default: "../static/img/acqext/csOrange.png",
        description: "CS visual stimuli to be displayed"
      },
      prompt: {
        type: jspsych.ParameterType.STRING, // BOOL, STRING, INT, FLOAT, FUNCTION, KEY, SELECT, HTML_STRING, IMAGE, AUDIO, VIDEO, OBJECT, COMPLEX
        default: "איך אתם מרגישים כשאתם רואים את התמונה הזו?",
        description: "general prompt at top of page"
      },
      background_colour: {
        type: jspsych.ParameterType.STRING,
        default: "MidnightBlue",
        description: "Changes the background colour."
      },
      font_colour: {
        type: jspsych.ParameterType.STRING,
        default: "White",
        description: "Changes the font colour of prompt."
      },
    }
  };

  class AffectiveRatingPlugin {
    constructor(jsPsych) {
        this.jsPsych = jsPsych;
    }
    trial(display_element, trial, on_load) {    
    //-------------------------------------------//
    // Display + Presentation
    //-------------------------------------------//

    let newHTML = "";

    // insert CSS
    const style = `
      <style>
      .jspsych-display-element {
        background: ${trial.background_colour};
      }
      .jspsych-content-wrapper {
        background: ${trial.background_colour};
        padding-bottom: 50px
      }
      body {
        background: ${trial.background_colour};
      }
      p {
        margin-block-start: 0px;
        margin-block-end: 0px;
      }

      .page-container {
        display: flex;
        flex-direction: column; /* top-to-bottom layout */
        justify-content: center; /* aligned on x axis */
        row-gap: 15px;
      }

      .trial-container {
        display: flex;
        flex-direction: row; /* left-to-right layout */
        align-items: center; /* aligned on y axis*/
        justify-content: space-evenly;
        gap: 0px;
        border: 2px solid black;
        padding: 15px;
        background-color: white;
      }
      .scale {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 20px;
      }
      
      button[type="trial"] {
        width: 200px;
        border-radius: 4px;
        text-align: center;
        margin: auto;
        background: white;
        color: black;
        border: black 1px solid;
        opacity: 0.8;
        transition: 0.3s
      }
      button[type="trial"]:hover:enabled {
        opacity: 1
      }
      button[type="trial"]:active {
        background-color: gray;
        transform: translateY(2px);
      }
      button[type="trial"]:hover + .hide {
        display: block;
        color: red;
      }
      </style>
    `;

    newHTML += style;
    
    let startValOne = Math.floor(Math.random()*100);
    let startValTwo = Math.floor(Math.random()*100);
    let startValThree = Math.floor(Math.random()*100);

    let scaleHTML = ` 
      <div class="trial-container">  
        <div style="width:18%; margin-right:50px">
          <img src=${trial.CSimage} style="width:100%">
        </div>

        <div style="display:flex; flex-direction:column; gap:50px; padding: 20px">

  
          <div class="scale">
            <p style="font-size:16px">רגועים</p>
            <div>
              <input type="range" min="0" max="100" value="${startValTwo}" step= "1" class="slider" id="slider-anxious">
              <p style="font-size:16px"></p>
            </div>
            <p style="font-size:16px">דרוּכים</p>
          </div>
        
     
        
        </div>
      </div>
    `

    const instructionsHTML = `
      <h3 style="font-size: 20px; padding-bottom: 20px; color: ${trial.font_colour}">${trial.prompt}</h3>
    `;
    let buttonHTML = `
      <button type="trial" id="button-el" style="margin-top:0px" title="Please respond to each scale">שלח</button>
      <div class="hide" id="hide">בבקשה ענו על כל השאלות על המסך.</div>
    `;

    newHTML += `
    <div class="page-container">
    ${instructionsHTML}
    ${scaleHTML}
    ${buttonHTML}
    </div>
    `

    display_element.innerHTML = newHTML;


    //-------------------------------------------//
    // Handling + Saving Responses
    //-------------------------------------------//

    // DOM elements
    const sliderAnxious = document.getElementById("slider-anxious");
    const buttonEl = document.getElementById("button-el");
    
    // saving decision times (RT) and responses
    const startTime = performance.now();

    let anxiousResponses = [];
    let anxiousRTs = [];


    // saving initial random value of each scale
    
    anxiousResponses.push(startValTwo);
    
    

    
    function logResponseAnxious() {
      anxiousResponses.push(sliderAnxious.value);
      anxiousRTs.push(performance.now());
    }



    // button is disabled until slider is moved
    buttonEl.disabled = true;

    function enableButton() {
      // check to see if a response has been made to all scales
      if ( anxiousResponses.length > 1 ){
        document.getElementById("hide").innerHTML = " ";
        buttonEl.disabled = false;
      }
    }

   
    
    sliderAnxious.addEventListener("click", () => {
      logResponseAnxious();
      enableButton();
    });
  
   

    // trial ends when submit button is clicked
    function endTrial() {
      // clearTimeout(trialTimeout);
      const endTime = performance.now();
      const  totalTime = endTime - startTime;
     
      var trial_data = {
        ratedStimulus: trial.CSimage,
      
        anxiousRating: sliderAnxious.value,
        
        totalTime: totalTime,

        // slider specific responses

        anxiousResponses: anxiousResponses,
        anxiousRTs: anxiousRTs,
        timeout: 0,

      }
    
      // add slight delay before trial ends
      setTimeout(() => {
        display_element.innerHTML = " ";
        jsPsych.finishTrial(trial_data);
      }, 200);
    }


    // trial times out if no response
    // function timeout() {
    //   const endTime = performance.now();
    //   const  totalTime = endTime - startTime;
     
    //   var trial_data = {
    //     ratedStimulus: trial.CSimage,
      
    //     anxiousRating: NaN,
        
    //     totalTime: totalTime,

    //     // slider specific responses

    //     anxiousResponses: anxiousResponses,
    //     anxiousRTs: anxiousRTs,
    //     timeout: 1,

    //   }
    
    //   // add slight delay before trial ends
    //   setTimeout(() => {
    //     display_element.innerHTML = " ";
    //     jsPsych.finishTrial(trial_data);
    //   }, 200);
    // }

    // trial ends when submit button is clicked
    buttonEl.addEventListener("click", endTrial);
    
    // // end trial after 10 seconds
    // const trialTimeout = setTimeout(() => {
    //   console.log("Timeout");
    //   timeout();
    // }, 10000);

  };

}
AffectiveRatingPlugin.info = info;

return AffectiveRatingPlugin;

})(jsPsychModule);
